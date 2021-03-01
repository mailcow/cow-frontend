<template>
  <div class="editor">
    <editor-menu-bar style="padding-bottom:2px" :editor="editor" v-slot="{ commands, isActive }">
      <div>
        <b-tooltip label="Bold" type="is-dark" :delay="50">        
          <button
            class="button is-white"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <b-icon icon="format-bold"/>
          </button>
        </b-tooltip>

        <b-tooltip label="Italics" type="is-dark" :delay="500">        
          <button
            class="button is-white"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <b-icon icon="format-italic"/>
          </button>
        </b-tooltip>

        <b-tooltip label="Strike-through" type="is-dark" :delay="500 ">        
          <button
            class="button is-white"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <b-icon icon="format-strikethrough"/>
          </button>
        </b-tooltip>

        <b-tooltip label="Underline" type="is-dark" :delay="5">        
          <button
            class="button is-white"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <b-icon icon="format-underline"/>
          </button>
        </b-tooltip>

        <b-tooltip label="Paragraph" type="is-dark" :delay="5">        
          <button
            class="button is-white"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <b-icon icon="format-paragraph"/>
          </button>
        </b-tooltip>

        <b-tooltip label="Heading" type="is-dark" :delay="500">        
          <button
            class="button is-white"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          > <b-icon icon="format-header-3"/></button>
        </b-tooltip>

        <b-tooltip label="Bullet List" type="is-dark" :delay="500">        
          <button
            class="button is-white"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <b-icon icon="format-list-bulleted"/>
          </button>
        </b-tooltip>

        <b-tooltip label="Ordered List" type="is-dark" :delay="50">        
          <button
            class="button is-white"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <b-icon icon="format-list-numbered"/>
          </button>
        </b-tooltip>

        <b-tooltip label="Quote" type="is-dark" :delay="50">        
          <button
            class="button is-white"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <b-icon icon="format-quote-close"/>
          </button>
        </b-tooltip>

        <b-tooltip label="Undo" type="is-dark" :delay="50">        
          <button
            class="button is-white"
            @click="commands.undo">
            <b-icon icon="undo"/>
          </button>
        </b-tooltip>

        <b-tooltip label="Redo" type="is-dark" :delay="50">        
          <button
            class="button is-white"
            @click="commands.redo">
            <b-icon icon="redo"/>
          </button>
        </b-tooltip>
      </div>
    </editor-menu-bar>
    <editor-content class="content_editor content" :editor="editor" />
  </div>
</template>

<script>

import { Editor, EditorContent, EditorMenuBar } from "tiptap";

import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  HorizontalRule
} from "tiptap-extensions";

export default {
  components: {
    EditorMenuBar,
    EditorContent
  },
  props: ["value"],
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new HorizontalRule()
        ],
        content: this.value,
        onUpdate: ({ getHTML }) => {
          // get new content on update
          const newContent = getHTML();
          this.$emit("input", newContent);
        }
      })
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>
