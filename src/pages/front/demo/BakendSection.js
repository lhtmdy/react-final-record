import WrapLayout from "@/components/WrapLayout";
import AppFormTable from "@/components/AppFormTable";
import { failure_sw, success_sw, warning_sw } from "@/utils/swal";
import AppButton from "@/components/AppButton";
import rsdtoImage from "@/assets/image/msgRsDto.png";
import CheckboxGroupExample from "@/components/CheckboxGroupExample";
import AppCodePanel from "@/components/AppCodePanel";
// import AppTabs from "@/components/AppTabs";
function BakendSection() {
  return (
    <>
      <div className="flex flex-col gap-y-5">
        <WrapLayout>
          <h3 className="text-h4 mb-4 ">1. 為什麼要先對齊 API 格式</h3>
          <h4 className="text-h5 mb-4 pl-2 border-blue-04 border-l-[4px] leading-[1]">
            前端和後端最大的溝通成本，不在技術，而在「理解不同」。
          </h4>
          <h5 className="text-h6 mb-1">常見問題</h5>
          <ul className="pl-5 list-disc">
            <li>日期格式不一（西元／民國）</li>
            <li>傳參有時包 data、有時沒有</li>
            <li>錯誤訊息結構不一致</li>
          </ul>
        </WrapLayout>
        <WrapLayout>
          <h3 className="text-h3 mb-4">2. 日期格式統一</h3>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <h4 className="text-h4 mb-4 pl-2 border-blue-04 border-l-[4px] leading-[1]">
                使用民國年字串。(通常政府專案使用)
              </h4>
              <AppFormTable className="mb-10">
                <tr>
                  <th className="w-[140px]">年</th>
                  <td>"114"</td>
                </tr>
                <tr>
                  <th>年月</th>
                  <td>"114/08"</td>
                </tr>
                <tr>
                  <th>年月日</th>
                  <td>"114/07/01"</td>
                </tr>
                <tr>
                  <th>年月日時分</th>
                  <td>"114/07/01 11:16"</td>
                </tr>
                <tr>
                  <th>年月日時分秒</th>
                  <td>"114/03/27 11:16:00"</td>
                </tr>
              </AppFormTable>
            </div>
            <div>
              <h4 className="text-h4 mb-4 pl-2 border-blue-04 border-l-[4px] leading-[1]">
                使用西元年字串。
              </h4>
              <AppFormTable>
                <tr>
                  <th className="w-[140px]">年</th>
                  <td>"2025"</td>
                </tr>
                <tr>
                  <th>年月</th>
                  <td>"2025/08"</td>
                </tr>
                <tr>
                  <th>年月日</th>
                  <td>"2025/07/01"</td>
                </tr>
                <tr>
                  <th>年月日時分</th>
                  <td>"2025/07/01 11:16"</td>
                </tr>
                <tr>
                  <th>年月日時分秒</th>
                  <td>"2025/03/27 11:16:00"</td>
                </tr>
              </AppFormTable>
            </div>
          </div>
        </WrapLayout>
        <WrapLayout>
          <h3 className="text-h3 mb-4">3. 分頁資料格式</h3>
          <h4 className="text-h4 mb-4 pl-2 border-blue-04 border-l-[4px] leading-[1]">
            回傳page(頁數) , size(每頁筆數) , totalPages(總頁數) , totalElements(總筆數) 以及
            content(資料陣列)
          </h4>
          <h5 className="text-h5 mb-1">常見問題</h5>
          <ul className="pl-5 list-disc mb-4">
            <li>page從 0 or 1 開始?</li>
          </ul>
          <pre className="bg-[black] text-white w-fit p-4 rounded">
            <code>
              {`{
  "statusCode": "200",
  "message": "執行成功",
  "data": {
    "agencyResumeDTOPageList": {
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
        </WrapLayout>
        <WrapLayout>
          <h3 className="text-h3 mb-4">4. 訊息處理</h3>
          <h5 className="text-h5 mb-1">常見問題</h5>
          <ul className="pl-5 list-disc mb-4">
            <li>訊息是否自動消失?</li>
            <li>是否需要關閉按鈕?</li>
            <li>是否有副標題?</li>
          </ul>
          <h5 className="text-h5 mb-1">踩坑紀錄</h5>
          <ul className="pl-5 list-disc mb-4">
            <li>
              資安署專案初期並未規劃副標題欄位，後續需求新增時，後端回應無法支援 subMessage 欄位
            </li>
            <li>
              前端依據 responseBody 的 statusCode 判斷回傳狀態與顯示對應 icon，但後端在回傳
              statusCode = 500 時，並未實際拋出 HTTP 500 例外。
              <img src={rsdtoImage} alt="RsDTO format" className="mt-2 w-[300px]" />
            </li>
          </ul>
          <div className="grid grid-cols-3 gap-x-4">
            <div>
              <AppButton
                className="mb-4"
                onClick={() => {
                  success_sw("新增成功", "副標題副標題副標題");
                }}>
                點我看成功訊息
              </AppButton>
              <AppCodePanel>
                {`{
  "statusCode": "200",
  "message": "新增成功",
  "subMessage": "副標題副標題副標題",
  "data": { ... }
}
`}
              </AppCodePanel>
            </div>
            <div>
              <AppButton
                className="mb-4"
                danger
                onClick={() => {
                  failure_sw("新增失敗");
                }}>
                點我看錯誤訊息
              </AppButton>
              <AppCodePanel>
                {`{
  "statusCode": "500", "400" or 其他
  "message": "新增失敗",
  "data": { ... }
}
`}
              </AppCodePanel>
            </div>
            <div>
              <AppButton
                className="mb-4"
                approved
                onClick={() => {
                  warning_sw("警告訊息");
                }}>
                點我看警告訊息
              </AppButton>
              <AppCodePanel>
                {`{
  "statusCode": "300",
  "message": "執行成功",
  "data": { ... }
}
`}
              </AppCodePanel>
            </div>
          </div>
        </WrapLayout>
        <WrapLayout>
          <h3 className="text-h3 mb-4">5. 多選傳遞格式統一</h3>
          <h5 className="text-h5 mb-1">踩坑紀錄</h5>
          <ul className="pl-5 list-disc mb-4">
            <li>不同後端工程師對於多選欄位傳遞格式的理解不同，導致前端在串接時需要特別注意</li>
            <li>
              技能檢定專案初期我建議以陣列格式傳參數，因為前端套件本身是接受陣列，但後端認為以逗號分隔字串（如
              "1,2,3,4"）較方便；後期又希望前端改為陣列形式
            </li>
          </ul>
          <CheckboxGroupExample />
        </WrapLayout>
        <WrapLayout>
          <h3 className="text-h3 mb-4">6. API 呼叫方式統一</h3>
          <h5 className="text-h5 mb-1">建議</h5>
          <ul className="pl-5 list-disc mb-4">
            <li>GET → 使用 Query String 傳參數</li>
            <li>POST → 使用 Request Body 傳參數</li>
            <li>查詢類用GET</li>
            <li>操作類用POST</li>
            <li>全部用POST</li>
          </ul>
          <h5 className="text-h5 mb-1">踩坑紀錄</h5>
          <AppFormTable>
            <thead>
              <tr>
                <th className="w-[200px]">行為</th>
                <th>實際狀況</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>查詢 API</td>
                <td>有時用 POST，有時用 GET，導致前端在串接時需要特別注意</td>
              </tr>
              <tr>
                <td>POST 傳參方式</td>
                <td>有時用 Body，有時用 Query String</td>
              </tr>
            </tbody>
          </AppFormTable>
        </WrapLayout>
        <WrapLayout>
          <h3 className="text-h3 mb-4">7.文字框長度</h3>
          <h5 className="text-h5 mb-1">常見問題</h5>
          <ul className="pl-5 list-disc mb-4">
            <li>字數限制多少?</li>
          </ul>
        </WrapLayout>
        <WrapLayout>
          <h3 className="text-h3 mb-4">8.上傳 / 下載</h3>
          <h5 className="text-h5 mb-1">上傳格式：</h5>
          <ul className="pl-5 list-disc mb-4">
            <li>FormData</li>
            <li>Base64</li>
          </ul>
          <h5 className="text-h5 mb-1">回傳格式：</h5>
          <ul className="pl-5 list-disc mb-4">
            <li>Base64</li>
            <li>
              application/octet-stream(需要額外處理 response header Content-Disposition 來取得檔名)
            </li>
          </ul>
        </WrapLayout>
      </div>
    </>
  );
}

export default BakendSection;
