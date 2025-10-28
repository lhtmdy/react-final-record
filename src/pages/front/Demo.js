import WrapLayout from "@/components/WrapLayout";
import AppFormTable from "@/components/AppFormTable";
import { failure_sw, success_sw, warning_sw } from "@/utils/swal";
import AppButton from "@/components/AppButton";
import rsdtoImage from "@/assets/image/msgRsDto.png";
import CheckboxGroupExample from "@/components/CheckboxGroupExample";
import AppCodePanel from "@/components/AppCodePanel";
import AppTabs, { CustomTabPanel } from "@/components/AppTabs";
import BakendSection from "./demo/BakendSection";
function Demo() {
  return (
    <>
      <div className="p-4 bg-blue-01">
        <div className="h-[100vh] flex flex-col justify-center">
          <h2 className="text-h2 text-blue-06 mb-4 text-center w0">
            🖥️ 新專案開始時，前端的溝通準備
          </h2>
        </div>
        <AppTabs tabs={["與後端溝通", "與SA溝通"]}>
          <CustomTabPanel>
            <div>
              <BakendSection />
            </div>
          </CustomTabPanel>
          <CustomTabPanel>
            <div>這是第二個頁面的內容</div>
          </CustomTabPanel>
        </AppTabs>
      </div>
    </>
  );
}

export default Demo;
