import { colored } from './production'

export default {
  title: 'OpenAPI Directory',
  subTitle: 'Community driven online collection',
  home: 'https://gitlab.com/niki-open/apis/',
  base: 'https://glcdn.githack.com/niki-open/apis/raw/master/api.json',
  keys: true,
  categories: true,
  unclassified: true,
  transform (data) {
    const apis = []

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let v = data[key]
        apis.push({
          title: v.versions[v.preferred].info.title,
          key,
          url: v.versions[v.preferred].swaggerYamlUrl,
          categories: v.versions[v.preferred].info['x-apis-categories']
        })
      }
    }

    apis.sort((a, b) => a.key.localeCompare(b.key))

    let cats = {}

    for (let i = 0; i < apis.length; i++) {
      const c = apis[i].categories

      if (c) {
        for (let j = 0; j < c.length; j++) {
          cats[c[j]] = cats[c[j]] || {
            title: (c[j][0].toUpperCase() + c[j].substr(1)).replace(/_/g, ' '),
            count: 0
          }

          cats[c[j]].count++
        }
      }
    }

    const keys = Object.keys(cats)
    keys.sort()

    const categories = {}
    keys.forEach(k => (categories[k] = cats[k]))
    colored(categories)

    return {apis, categories}
  }
}
