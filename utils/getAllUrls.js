const getAllUrls = (children, path = []) => {
    let urls = []
    for (const child of children) {
        const curUrl = child.properties.pageUrl.url
        const curPath = [...path, curUrl]
        urls.push(curPath)

        const childUrls = getAllUrls(child.children, curPath)
        urls = [...urls, ...childUrls]
    }

    return urls
}

export default getAllUrls
