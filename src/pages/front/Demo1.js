import WrapLayout from "@/components/WrapLayout";
import AppFormTable from "@/components/AppFormTable";
import { failure_sw, success_sw, warning_sw } from "@/utils/swal";
import AppButton from "@/components/AppButton";
import rsdtoImage from "@/assets/image/msgRsDto.png";
import CheckboxGroupExample from "@/components/CheckboxGroupExample";
import AppCodePanel from "@/components/AppCodePanel";

function Demo1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-8 py-24 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-5xl font-bold text-white mb-6 animate-fadeIn">
              🚀 前後端溝通黃金法則
            </h1>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              掌握 API 溝通技巧，讓開發流程更順暢
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-white font-medium">💡 減少重工</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-white font-medium">⚡ 提升效率</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-white font-medium">🎯 統一標準</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-16">
        <div className="grid gap-12">
          {/* Section 1 */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-3 text-3xl">🎯</span>
                為什麼要先對齊 API 格式
              </h2>
            </div>
            <div className="p-8">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">核心概念</h3>
                <p className="text-purple-700 text-lg leading-relaxed">
                  前端和後端最大的溝通成本，不在技術，而在「理解不同」。
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-red-800 mb-2">日期格式</h4>
                  <p className="text-red-600">西元／民國年不一致</p>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">傳參方式</h4>
                  <p className="text-yellow-600">有時包 data、有時沒有</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">錯誤訊息</h4>
                  <p className="text-blue-600">結構不一致</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-3 text-3xl">📅</span>
                日期格式統一
              </h2>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* 民國年 */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      🏛️ 民國年格式
                      <span className="ml-2 text-sm bg-white bg-opacity-20 rounded-full px-3 py-1">
                        政府專案
                      </span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-3">
                        <span className="font-medium">年</span>
                        <code className="bg-white bg-opacity-30 rounded px-2 py-1">"114"</code>
                      </div>
                      <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-3">
                        <span className="font-medium">年月</span>
                        <code className="bg-white bg-opacity-30 rounded px-2 py-1">"114/08"</code>
                      </div>
                      <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-3">
                        <span className="font-medium">年月日</span>
                        <code className="bg-white bg-opacity-30 rounded px-2 py-1">
                          "114/07/01"
                        </code>
                      </div>
                      <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-3">
                        <span className="font-medium">完整時間</span>
                        <code className="bg-white bg-opacity-30 rounded px-2 py-1">
                          "114/07/01 11:16:00"
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 西元年 */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      🌍 西元年格式
                      <span className="ml-2 text-sm bg-white bg-opacity-20 rounded-full px-3 py-1">
                        一般專案
                      </span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-3">
                        <span className="font-medium">年</span>
                        <code className="bg-white bg-opacity-30 rounded px-2 py-1">"2025"</code>
                      </div>
                      <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-3">
                        <span className="font-medium">年月</span>
                        <code className="bg-white bg-opacity-30 rounded px-2 py-1">"2025/08"</code>
                      </div>
                      <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-3">
                        <span className="font-medium">年月日</span>
                        <code className="bg-white bg-opacity-30 rounded px-2 py-1">
                          "2025/07/01"
                        </code>
                      </div>
                      <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-3">
                        <span className="font-medium">完整時間</span>
                        <code className="bg-white bg-opacity-30 rounded px-2 py-1">
                          "2025/07/01 11:16:00"
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-3 text-3xl">📊</span>
                分頁資料格式
              </h2>
            </div>
            <div className="p-8">
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-6">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">⚠️ 常見問題</h3>
                <p className="text-amber-700">page 從 0 或 1 開始？這個一定要事先確認！</p>
              </div>

              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-4 text-gray-400 text-sm">分頁回傳格式範例</span>
                </div>
                <pre className="text-green-400 p-6 overflow-x-auto">
                  <code>
                    {`{
  "statusCode": "200",
  "message": "執行成功",
  "data": {
    "pageList": {
      "page": 1,
      "size": 10,
      "totalPages": 4,
      "totalElements": 35,
      "content": [ ... ]
    }
  }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Section 4 - Message Handling */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-3 text-3xl">💬</span>
                訊息處理統一
              </h2>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <AppButton
                    className="w-full mb-4 transform hover:scale-105 transition-transform duration-200"
                    onClick={() => success_sw("新增成功", "副標題副標題副標題")}>
                    <span className="mr-2">✅</span>
                    成功訊息
                  </AppButton>
                  <div className="bg-green-50 rounded-lg p-4">
                    <code className="text-green-800 text-sm">statusCode: "200"</code>
                  </div>
                </div>

                <div className="text-center">
                  <AppButton
                    className="w-full mb-4 transform hover:scale-105 transition-transform duration-200"
                    danger
                    onClick={() => failure_sw("新增失敗")}>
                    <span className="mr-2">❌</span>
                    錯誤訊息
                  </AppButton>
                  <div className="bg-red-50 rounded-lg p-4">
                    <code className="text-red-800 text-sm">statusCode: "500"</code>
                  </div>
                </div>

                <div className="text-center">
                  <AppButton
                    className="w-full mb-4 transform hover:scale-105 transition-transform duration-200"
                    approved
                    onClick={() => warning_sw("警告訊息")}>
                    <span className="mr-2">⚠️</span>
                    警告訊息
                  </AppButton>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <code className="text-yellow-800 text-sm">statusCode: "300"</code>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                  <span className="mr-2">🚨</span>
                  踩坑經驗分享
                </h3>
                <ul className="space-y-2 text-red-700">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span>資安署專案初期沒規劃副標題，後續新增時後端無法支援 subMessage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span>statusCode 500 但沒拋出 HTTP 500 例外，錯誤攔截器抓不到</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5 - Multi Select */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-3 text-3xl">☑️</span>
                多選格式統一
              </h2>
            </div>
            <div className="p-8">
              <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-xl mb-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">💡 技能檢定專案經驗</h3>
                <p className="text-orange-700">
                  前端建議用陣列，後端偏好逗號字串，最後又要改回陣列... 😅
                </p>
              </div>

              <CheckboxGroupExample />
            </div>
          </div>

          {/* Section 6 - API Methods */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-3 text-3xl">🔄</span>
                API 呼叫方式統一
              </h2>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">建議規範</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                        GET
                      </span>
                      <span className="text-green-800">查詢資料 + Query String</span>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                        POST
                      </span>
                      <span className="text-blue-800">操作資料 + Request Body</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">常見問題</h3>
                  <div className="bg-red-50 rounded-lg p-4">
                    <ul className="space-y-2 text-red-700">
                      <li className="flex items-start">
                        <span className="mr-2">❌</span>
                        <span>查詢 API 有時 POST 有時 GET</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">❌</span>
                        <span>POST 參數有時 Body 有時 Query</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7 & 8 - Other Considerations */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="mr-3 text-2xl">📝</span>
                  文字框長度
                </h2>
              </div>
              <div className="p-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">常見問題</h3>
                  <p className="text-blue-700">字數限制多少？需在 UI/UX 階段確認</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="mr-3 text-2xl">📎</span>
                  上傳/下載
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">上傳格式</h4>
                    <div className="flex gap-2">
                      <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-sm">
                        FormData
                      </span>
                      <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-sm">
                        Base64
                      </span>
                    </div>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-800 mb-2">下載格式</h4>
                    <div className="flex gap-2">
                      <span className="bg-indigo-200 text-indigo-800 px-2 py-1 rounded text-sm">
                        Base64
                      </span>
                      <span className="bg-indigo-200 text-indigo-800 px-2 py-1 rounded text-sm">
                        octet-stream
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">記住這些原則 🎯</h2>
            <p className="text-lg mb-6 text-purple-100">統一格式，減少溝通成本，提升開發效率</p>
            <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-lg font-medium">事先討論 {">"} 後續重工</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo1;
