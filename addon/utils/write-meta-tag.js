export default function writeMetaTag(document, tagContent) {
  let versionMetaElement = document.createElement('meta');
  versionMetaElement.name = 'ember-cli-app-version';
  versionMetaElement.content = tagContent;

  document.head.appendChild(versionMetaElement);
}
