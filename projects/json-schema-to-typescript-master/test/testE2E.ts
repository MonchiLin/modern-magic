import test from 'ava'
import { readdirSync } from 'fs'
import { find } from 'lodash'
import { join } from 'path'
import { compile, JSONSchema, Options } from '../src'
import { log, stripExtension } from '../src/utils'

const dir = __dirname + '/e2e'

type TestCase = {
  input: JSONSchema
  error?: true
  exclude?: boolean
  only?: boolean
  options?: Options
}

export function hasOnly() {
  return readdirSync(dir)
    .filter(_ => /^.*\.js$/.test(_))
    .map(_ => require(join(dir, _)))
    .some(_ => _.only)
}

export function run() {

  // [filename, absolute dirname, contents][]
  const modules = readdirSync(dir)
    .filter(_ => /^.*\.js$/.test(_))
    .map(_ => [_, require(join(dir, _))]) as [string, TestCase][]

  // exporting `const only=true` will only run that test
  // exporting `const exclude=true` will not run that test
  const only = find(modules, _ => Boolean(_[1].only))
  if (only) {
    runOne(only[1], only[0])
  } else {
    modules
      .filter(_ => !_[1].exclude)
      .forEach(_ => runOne(_[1], _[0]))
  }
}

function runOne(exports: TestCase, name: string) {
  log(`Running test: "${name}"`)
  test(name, async t => {
    if (exports.error) {
      try {
        await compile(exports.input, stripExtension(name), exports.options)
      } catch (e) {
        t.true(e instanceof Error)
      }
    } else {
      t.snapshot(await compile(exports.input, stripExtension(name), exports.options))
    }
  })
}