'use client';

import { useState } from 'react';
import { 
  encodingOptions, 
  EncodingType, 
  performEncoding,
  type EncodingOption 
} from '@/lib/encryption';

/**
 * 加密工具主頁面
 * 提供多種編碼轉換功能
 */
export default function Home() {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [selectedEncoding, setSelectedEncoding] = useState<EncodingType>(EncodingType.BASE64);
  const [isDecode, setIsDecode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  /**
   * 處理編碼轉換
   */
  const handleConvert = async () => {
    if (!inputText.trim()) {
      setError('請輸入要轉換的文字');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await performEncoding(inputText, selectedEncoding, isDecode);
      setOutputText(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '轉換失敗');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 複製結果到剪貼簿
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      // 可以在這裡添加成功提示
    } catch (err) {
      setError('複製失敗');
    }
  };

  /**
   * 清空所有內容
   */
  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError('');
  };

  const currentOption = encodingOptions.find(opt => opt.type === selectedEncoding);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 標題 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            加密工具
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            支援多種編碼格式的雙向轉換
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 輸入區域 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                輸入文字
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="請輸入要轉換的文字..."
                className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white resize-none"
              />
            </div>

            {/* 編碼選項 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                編碼類型
              </label>
              <div className="grid grid-cols-2 gap-2">
                {encodingOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setSelectedEncoding(option.type)}
                    className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                      selectedEncoding === option.type
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 操作按鈕 */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsDecode(false)}
                className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                  !isDecode
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                編碼
              </button>
              <button
                onClick={() => setIsDecode(true)}
                disabled={!currentOption?.isReversible}
                className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                  isDecode && currentOption?.isReversible
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                解碼
              </button>
            </div>

            {/* 轉換按鈕 */}
            <div className="flex gap-2">
              <button
                onClick={handleConvert}
                disabled={isLoading || !inputText.trim()}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '轉換中...' : '轉換'}
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                清空
              </button>
            </div>
          </div>

          {/* 輸出區域 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                轉換結果
              </label>
              <div className="relative">
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="轉換結果將顯示在這裡..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-800 dark:text-white resize-none"
                />
                {outputText && (
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    複製
                  </button>
                )}
              </div>
            </div>

            {/* 錯誤訊息 */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* 編碼資訊 */}
            {currentOption && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                  {currentOption.name}
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  {currentOption.isReversible ? '支援雙向轉換' : '單向雜湊，無法反向解碼'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 使用說明 */}
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            使用說明
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">支援的編碼格式：</h3>
              <ul className="space-y-1">
                <li>• Base64 - 常用於資料傳輸</li>
                <li>• URL 編碼 - 網址參數編碼</li>
                <li>• HTML 實體 - 網頁內容編碼</li>
                <li>• 十六進位 - 二進位資料表示</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">雜湊演算法：</h3>
              <ul className="space-y-1">
                <li>• SHA256 - 安全雜湊演算法</li>
                <li>• MD5 - 訊息摘要演算法</li>
                <li>• SHA1 - 安全雜湊演算法</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
