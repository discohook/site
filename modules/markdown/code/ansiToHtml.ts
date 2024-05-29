interface ColorMap {
    [key: number]: string;
}
  
  export default function ansiToHtml(text: string): string {
    const fgColorMap: ColorMap = {
        30: '#4f545c',
        31: '#dc322f',
        32: '#859900',
        33: '#b58900',
        34: '#268bd2',
        35: '#d33682',
        36: '#2aa198',
        37: '#ffffff',
    };
  
    const bgColorMap: ColorMap = {
        40: '#002b36',
        41: '#cb4b16',
        42: '#586e75',
        43: '#657b83',
        44: '#839496',
        45: '#6c71c4',
        46: '#93a1a1',
        47: '#fdf6e3',
    };
  
    let html = '';
    let currentFgColor: string | null = null;
    let currentBgColor: string | null = null;
    let isBold = false;
    let isUnderline = false;
  
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
    
        if (char === '\x1b' && text[i + 1] === '[') {
            const codesEndIndex = text.indexOf('m', i);
            const codes = text.slice(i + 2, codesEndIndex).split(';').map(code => parseInt(code, 10));
    
            for (const code of codes) {
                if (code === 0) {
                    currentFgColor = null;
                    currentBgColor = null;
                    isBold = false;
                    isUnderline = false;
                } else if (code === 1) {
                    isBold = true;
                } else if (code === 4) {
                    isUnderline = true;
                } else if (code in fgColorMap) {
                    currentFgColor = fgColorMap[code];
                } else if (code in bgColorMap) {
                    currentBgColor = bgColorMap[code];
                }
            }
    
            i = codesEndIndex;
            continue;
        }
    
        let style = '';
        if (currentFgColor) {
            style += `color: ${currentFgColor};`;
        }
        if (currentBgColor) {
            style += `background-color: ${currentBgColor};`;
        }
        if (isBold) {
            style += 'font-weight: bold;';
        }
        if (isUnderline) {
            style += 'text-decoration: underline;';
        }
    
        if (style) {
            html += `<span style="${style}">${char}</span>`;
        } else {
            html += char;
        }
    }
  
    return html;
}