export function changeValue(e) {
    console.log('change')
    return {
        type: 'VALUE_CHANGED',
        payload: e.target.value
    }
}