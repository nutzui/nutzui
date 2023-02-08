import { t } from 'i18next'

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

export const getEditorParagraphType = (editor: any) => {
  if (editor?.state?.selection?.$anchor?.path?.[1] === 0 && editor?.state?.selection?.$anchor?.path?.[2] === 0) {
    return 'title'
  }
  if (editor.isActive('heading', { level: 1 })) {
    return 'h1'
  }
  if (editor.isActive('heading', { level: 2 })) {
    return 'h2'
  }
  if (editor.isActive('heading', { level: 3 })) {
    return 'h3'
  }
  if (editor.isActive('heading', { level: 4 })) {
    return 'h4'
  }
  if (!editor.isActive('heading')) {
    return 'text'
  }
  return '?'
}

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

export const paragraphTypeToName = (n: string) => {
  if (n === 'title') {
    return t('Title')
  }
  if (n === 'text') {
    return t('Normal text')
  }
  if (n === 'h1') {
    return t('Heading 1')
  }
  if (n === 'h2') {
    return t('Heading 2')
  }
  if (n === 'h3') {
    return t('Heading 3')
  }
  if (n === 'h4') {
    return t('Heading 4')
  }
  return '?'
}
