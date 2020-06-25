<template>
  <div>
    <div class="q-gutter-md row">
      <q-input v-model="user" placeholder="Owner Name" label="Owner"/>
      <q-input v-model="repo" placeholder="Repo Name" label="Repo"/>
      <q-input v-model="commitMessage" placeholder="Commit Message" label="Message">
        <template v-slot:append>
          <q-icon v-foxus="MESSAGE_PATTERN" :name="ionHelpCircleOutline">
            <q-tooltip>
              <p
                style="word-break: normal; width:auto; display:block; white-space:pre-wrap; word-wrap:break-word; overflow: hidden ;">
                {{MESSAGE_PATTERN}}</p>
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>
      <q-space/>
      <q-btn
        v-foxus="'手动上传文件'"
        color="deep-orange"
        glossy push
        @click="triggerSelect"
      >
        <div class="row items-center no-wrap">
          <q-icon left :name="ionAlbumsOutline"/>
          <div class="text-center">手动浏览</div>
        </div>
      </q-btn>

    </div>
    <upload-area
      :file-records="fileRecords"
      @upload="upload"
      @remove="remove"
      @copy="copyUri"
      @copyMarkdown="copyMarkdown"
      @fileSelected="handleFileSelect"
    />
    <q-file ref="QFile" style="display: none;" hidden @input="handleFileSelect"/>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref,} from '@vue/composition-api'
  import {githubApi} from 'src/api';
  import UploadArea from 'components/UploadArea.vue';
  import {FileRecord, getFileRecord} from 'src/common';
  import {clipboard} from 'electron';
  import {ionHelpCircleOutline, ionAlbumsOutline} from '@quasar/extras/ionicons-v5'

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
      UploadArea
    },
    setup(props, context) {
      const {$axios, $q, $store} = context.root
      const QFile = ref<any>()

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

      const upload = (record: FileRecord, index: number) => {
        const [name, ext] = [record.name, record.ext]
        $store.commit('updateFileRecord', {index, key: 'uploading', value: true})

        $axios(
          githubApi.createFile(user.value, repo.value, name + new Date().getTime() + ext, {
            message: commitMessage + ' ' + new Date().getTime(),
            content: record.base64,
            committer: {
              name: 'GithubFileUploader',
              email: 'gfu@undefind.com'
            }
          }))
          .then(({data}) => {
            $store.commit('updateFileRecord', {index, key: 'uploaded', value: true})
            $store.commit('updateFileRecord', {index, key: 'uri', value: data.content.download_url})
          })
          .catch(err => {
            $store.commit('updateFileRecord', {index, key: 'error', value: err})
          })
          .finally(() => {
            $store.commit('updateFileRecord', {index, key: 'uploading', value: false})
          })
      }

      const remove = (record: FileRecord) => {
        fileRecords.value = fileRecords.value
          .filter(item => item.name !== record.name)
      }

      const copyUri = (record: FileRecord) => {
        $q.notify({
          message: '已复制资源地址至至剪切板'
        })
        clipboard.writeText(record.uri)
      }

      const copyMarkdown = (record: FileRecord) => {
        $q.notify({
          message: '已复制 Markdown 至剪切板'
        })
        const template = `![${record.name}](${[record.uri]})`
        clipboard.writeText(template)
      }

      const handleFileSelect = (file: File) => {
        addFile(getFileRecord(file))
      }

      const triggerSelect = (e) => {
        QFile.value.pickFiles()
      }

      return {
        QFile,
        user,
        repo,
        commitMessage,
        fileRecords,
        upload,
        remove,
        copyUri,
        copyMarkdown,
        triggerSelect,
        handleFileSelect,
        MESSAGE_PATTERN,
        ionHelpCircleOutline,
        ionAlbumsOutline,
      }
    }
  })
</script>

<style>

</style>
