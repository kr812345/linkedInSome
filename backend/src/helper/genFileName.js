// const Math = require('Math');    

const genFileName = () => {
    const prefix = Date().split(' ').slice(1,5).join(' ').toLocaleLowerCase().replaceAll(" ", "").replaceAll(':','');
    const suffix = Number((Math.random() * 1e9).toFixed());
    return `${prefix}-${suffix}`;
}

export default genFileName;