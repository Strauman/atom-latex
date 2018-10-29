/// <reference types="atom" />

import * as _ from 'lodash'

export function heredoc (input: string | null) {
  if (input === null) { return null }

  const lines = _.dropWhile(input.split(/\r\n|\n|\r/), line => line.length === 0)
  const indentLength = _.takeWhile(lines[0], char => char === ' ').length
  const truncatedLines = lines.map(line => line.slice(indentLength))

  return truncatedLines.join('\n')
}

export function promisify (target: Function) {
  return (...args: any[]) => {
    return new Promise((resolve, reject) => {
      target(...args, (error: Error, data: any) => { error ? reject(error) : resolve(data) })
    })
  }
}

export function getEditorDetails () {
  const editor = atom.workspace.getActiveTextEditor()
  if (!editor) return {}

  const filePath = editor.getPath()
  const position = editor.getCursorBufferPosition()
  const lineNumber = position.row + 1

  return { editor, filePath, position, lineNumber }
}

export function replacePropertiesInString (text: string, properties: any) {
  return _.reduce(properties, (current, value, name) => current.replace(`{${name}}`, value), text)
}

export function isSourceFile (filePath: string | null) {
  return !!filePath && !!filePath.match(/\.(?:tex|tikz|lhs|lagda|[prs]nw)$/i)
}

export function isTexFile (filePath: string | null) {
  return !!filePath && !!filePath.match(/\.(?:tex|lhs|lagda)$/i)
}

export function isKnitrFile (filePath: string | null) {
  return !!filePath && !!filePath.match(/\.[rs]nw$/i)
}

export function isPdfFile (filePath: string | null) {
  return !!filePath && !!filePath.match(/\.pdf$/i)
}

export function isPsFile (filePath: string | null) {
  return !!filePath && !!filePath.match(/\.ps$/i)
}

export function isDviFile (filePath: string | null) {
  return !!filePath && !!filePath.match(/\.(?:dvi|xdv)$/i)
}
