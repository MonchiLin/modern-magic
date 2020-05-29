<template>
  <div>
    <div class="q-gutter-md row">
      <q-input v-model="user" placeholder="Owner Name" label="Owner"/>
      <q-input v-model="repo" placeholder="Repo Name" label="Repo"/>
      <q-input v-model="commitMessage" placeholder="Commit Message" label="Message">
        <template v-slot:append>
          <q-icon v-foxus="MESSAGE_PATTERN" name="contact_support">
            <q-tooltip>
              <p
                style="word-break: normal; width:auto; display:block; white-space:pre-wrap; word-wrap:break-word; overflow: hidden ;">
                {{MESSAGE_PATTERN}}</p>
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>
    </div>
    <Uploader
      :file-records="fileRecords"
      @upload="upload"
      @remove="remove"
      @copy="copy"
      @fileSelected="handleFileSelect"
    />
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref,} from '@vue/composition-api'
  import {githubApi} from "src/api";
  import Uploader from "src/components/Uploader.vue";
  import {FileRecord} from "src/common";
  import {clipboard} from "electron";

  const MESSAGE_PATTERN = `
Message 用于在显示在 commit message 区域，除纯文本之外也支持下面几个占位符
占位符  - 占位符均由双大括号包裹 {{}}，不支持嵌套。
时间    - {{date:YYYY-MM-DD hh:mm}}，示例输入：我在 {{date}} 提交了。示例输出：我在 2020-13-31 25:61 提交了。
地点    - {{place}}，示例输入：我在 {{place}} 玩泥巴。示例输出：我在 东北 玩泥巴。
用户名  - {{user}}，示例输入：我是 {{user}}。示例输出：我是 kiki。
系统    - {{system}}，示例输入：来自 {{system}}。示例输出：来自 Darwin。
文件    - {{file}}
       - {{file:mame}} 文件名
       - {{file:size:unit}} 文件大小，unit 表示单位，默认为 M
`

  export default defineComponent({
    components: {
      Uploader
    },
    setup(props, context) {
      const {$axios, $q, $store} = context.root

      const fileResults = ref([])

      const commitMessage = computed({
        get: () => $store.state.commitMessage,
        set: val => {
          $store.commit('setCommitMessage', val)
        }
      })

      const fileRecords = computed({
        get: () => $store.state.fileRecords,
        set: val => {
          $store.commit('setFileRecords', val)
        }
      })

      const addFile = (record: FileRecord) => {
        $store.commit('addFile', record)
      }

      const user = computed({
        get: () => $store.state.user,
        set: val => {
          $store.commit('setUser', val)
        }
      })

      const repo = computed({
        get: () => $store.state.repo,
        set: val => {
          $store.commit('setRepo', val)
        }
      })

      const upload = async (record: FileRecord, index) => {
        const [name, ext] = [record.name, record.ext]
        $store.commit("updateFileRecord", {index, record: {...record, uploading: true}})

        $axios(
          githubApi.createFile(user.value, repo.value, name + new Date().getTime() + ext, {
            message: commitMessage + " " + new Date().getTime(),
            content: record.base64,
            committer: {
              name: "GithubFileUploader",
              email: "gfu@undefind.com"
            }
          }))
          .then(({data}) => {
            fileResults[name] = data.content.download_url
            $store.commit("updateFileRecord", {index, record: {...record, uploaded: true}})
          })
          .catch(err => {
            $store.commit("updateFileRecord", {index, record: {...record, error: err}})
          })
          .finally(() => {
            $store.commit("updateFileRecord", {index, record: {...record, uploading: false}})
          })
      }

      const remove = (record: FileRecord) => {
        fileRecords.value = fileRecords.value
          .filter(item => item.name !== record.name)
      }

      const copy = (record: FileRecord) => {
        $q.notify({
          message: "已复制 Markdown 至剪切板"
        })
        const template = `![${record.name}](${fileResults[record.name]})`
        clipboard.writeText(template)
      }

      const handleFileSelect = (record: FileRecord) => {
        addFile(record)
      }

      return {
        user,
        repo,
        commitMessage,
        fileRecords,
        fileResults,
        upload,
        remove,
        copy,
        handleFileSelect,
        MESSAGE_PATTERN,
      }
    }
  })
</script>

<style>

</style>
