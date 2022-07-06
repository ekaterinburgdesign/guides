const Typograf = require('typograf')

const tp = new Typograf({
    locale: ['ru', 'en-US'],
})

tp.disableRule([
    'common/space/trimRight',
    'common/space/trimLeft',
    'common/space/delBeforePunctuation',
    'common/space/afterPunctuation',
    'common/nbsp/replaceNbsp',
])

export default tp
