import errorIcon from "@/assets/image/swal/error-icon.svg";
import infoIcon from "@/assets/image/swal/info-icon.svg";
import successIcon from "@/assets/image/swal/success-icon.svg";
import warningIcon from "@/assets/image/swal/warning-icon.svg";
import Swal from "sweetalert2";

const swalWithCustomButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn",
  },
  buttonsStyling: false,
});

const getOptions = (title, html, icon, options) => {
  return {
    iconColor: "#fff",
    icon: "warning", //套用warning 的 keyframes
    iconHtml: '<img src="' + icon + '"/>',
    // showConfirmButton: true,
    showConfirmButton: options?.showConfirmButton ?? false,
    confirmButtonText: "確認",
    title: "<p class='text-[18px] leading-[24px] text-gray-07 my-0 p-0'>" + title + "</p>",
    html: "<p class='text-p leading-[22px] text-gray-05 my-0 p-0'>" + html + "</p>",
    width: 320,
    timer: options?.timer ?? 2000,
    didOpen: function () {
      // disable auto-focus on initial opening
      Swal.getConfirmButton().blur();
    },
  };
};
const getErrorOptions = (title, html, icon) => {
  return {
    iconColor: "#fff",
    icon: "warning", //套用warning 的 keyframes
    iconHtml: '<img src="' + icon + '"/>',
    showConfirmButton: true,
    // showConfirmButton: false,
    confirmButtonText: "確認",
    title: "<p class='text-[18px] leading-[24px] text-gray-07 my-0 p-0'>" + title + "</p>",
    html: "<p class='text-p leading-[22px] text-gray-05 my-0 p-0'>" + html + "</p>",
    width: 320,
    didOpen: function () {
      // disable auto-focus on initial opening
      Swal.getConfirmButton().blur();
    },
  };
};

export const success_sw = (title, html = "", options) => {
  return new Promise((resolve) => {
    // nextTick(() => {
    setTimeout(() => {
      swalWithCustomButtons
        .fire({
          ...getOptions(title, html, successIcon, options),
        })
        .then((result) => {
          resolve(result);
        });
    }, 50);
  });
  //   });
};

export const warning_sw = (title, html = "", options) => {
  return new Promise((resolve) => {
    // nextTick(() => {
    setTimeout(() => {
      swalWithCustomButtons
        .fire({
          ...getErrorOptions(title, html, warningIcon, options),
        })
        .then((result) => {
          resolve(result);
        });
    }, 50);
    // });
  });
};

export const failure_sw = (title, html = "", options) => {
  return new Promise((resolve) => {
    // nextTick(() => {
    setTimeout(() => {
      swalWithCustomButtons
        .fire({
          ...getErrorOptions(title, html, errorIcon, options),
        })
        .then((result) => {
          resolve(result);
        });
    }, 50);
  });
  //   });
};

export const info_sw = (title, html = "", options) => {
  return new Promise((resolve) => {
    // nextTick(() => {
    setTimeout(() => {
      swalWithCustomButtons
        .fire({
          icon: "question",
          ...getOptions(title, html, infoIcon, options),
        })
        .then((result) => {
          resolve(result);
        });
    }, 50);
  });
  //   });
};
