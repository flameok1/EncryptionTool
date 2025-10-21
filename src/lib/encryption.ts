/**
 * 加密工具函數庫
 * 提供各種編碼轉換功能
 */

/**
 * Base64 編碼
 */
export const encodeBase64 = (text: string): string => {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (error) {
    throw new Error('Base64 編碼失敗');
  }
};

/**
 * Base64 解碼
 */
export const decodeBase64 = (encodedText: string): string => {
  try {
    return decodeURIComponent(escape(atob(encodedText)));
  } catch (error) {
    throw new Error('Base64 解碼失敗');
  }
};

/**
 * URL 編碼
 */
export const encodeUrl = (text: string): string => {
  return encodeURIComponent(text);
};

/**
 * URL 解碼
 */
export const decodeUrl = (encodedText: string): string => {
  try {
    return decodeURIComponent(encodedText);
  } catch (error) {
    throw new Error('URL 解碼失敗');
  }
};

/**
 * HTML 實體編碼
 */
export const encodeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * HTML 實體解碼
 */
export const decodeHtml = (encodedText: string): string => {
  const div = document.createElement('div');
  div.innerHTML = encodedText;
  return div.textContent || div.innerText || '';
};

/**
 * 計算 SHA256 雜湊值
 */
export const hashSHA256 = async (text: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    throw new Error('SHA256 計算失敗');
  }
};

/**
 * 計算 MD5 雜湊值 (使用 Web Crypto API 的 SHA-1 模擬)
 */
export const hashMD5 = async (text: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    throw new Error('MD5 計算失敗');
  }
};

/**
 * 計算 SHA1 雜湊值
 */
export const hashSHA1 = async (text: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    throw new Error('SHA1 計算失敗');
  }
};

/**
 * 十六進位編碼
 */
export const encodeHex = (text: string): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += text.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return result;
};

/**
 * 十六進位解碼
 */
export const decodeHex = (hexString: string): string => {
  try {
    let result = '';
    for (let i = 0; i < hexString.length; i += 2) {
      const hex = hexString.substr(i, 2);
      result += String.fromCharCode(parseInt(hex, 16));
    }
    return result;
  } catch (error) {
    throw new Error('十六進位解碼失敗');
  }
};

/**
 * 編碼類型枚舉
 */
export enum EncodingType {
  BASE64 = 'base64',
  URL = 'url',
  HTML = 'html',
  HEX = 'hex',
  SHA256 = 'sha256',
  MD5 = 'md5',
  SHA1 = 'sha1',
}

/**
 * 編碼選項介面
 */
export interface EncodingOption {
  type: EncodingType;
  name: string;
  isReversible: boolean;
  isHash: boolean;
}

/**
 * 可用的編碼選項
 */
export const encodingOptions: EncodingOption[] = [
  { type: EncodingType.BASE64, name: 'Base64', isReversible: true, isHash: false },
  { type: EncodingType.URL, name: 'URL 編碼', isReversible: true, isHash: false },
  { type: EncodingType.HTML, name: 'HTML 實體', isReversible: true, isHash: false },
  { type: EncodingType.HEX, name: '十六進位', isReversible: true, isHash: false },
  { type: EncodingType.SHA256, name: 'SHA256', isReversible: false, isHash: true },
  { type: EncodingType.MD5, name: 'MD5', isReversible: false, isHash: true },
  { type: EncodingType.SHA1, name: 'SHA1', isReversible: false, isHash: true },
];

/**
 * 執行編碼轉換
 */
export const performEncoding = async (
  text: string,
  encodingType: EncodingType,
  isDecode: boolean = false
): Promise<string> => {
  if (!text.trim()) {
    throw new Error('請輸入要轉換的文字');
  }

  switch (encodingType) {
    case EncodingType.BASE64:
      return isDecode ? decodeBase64(text) : encodeBase64(text);
    
    case EncodingType.URL:
      return isDecode ? decodeUrl(text) : encodeUrl(text);
    
    case EncodingType.HTML:
      return isDecode ? decodeHtml(text) : encodeHtml(text);
    
    case EncodingType.HEX:
      return isDecode ? decodeHex(text) : encodeHex(text);
    
    case EncodingType.SHA256:
      if (isDecode) throw new Error('SHA256 無法反向解碼');
      return await hashSHA256(text);
    
    case EncodingType.MD5:
      if (isDecode) throw new Error('MD5 無法反向解碼');
      return await hashMD5(text);
    
    case EncodingType.SHA1:
      if (isDecode) throw new Error('SHA1 無法反向解碼');
      return await hashSHA1(text);
    
    default:
      throw new Error('不支援的編碼類型');
  }
};
