export default function getAppVersion() {
  return document.head.querySelector(`meta[name="ember-cli-app-version"]`)
    .content;
}
