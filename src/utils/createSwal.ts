import Swal from "sweetalert2";

type IconSwal = "error" | "success" | "question" | "success" | "warning";

const createSwal = (
  title: string,
  text: string,
  icon: IconSwal,
  colorButton: string,
  showcancelButton: boolean = false,
  showDenyButton: boolean = false
): any => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "ยืนยัน",
    confirmButtonColor: colorButton,
    showCancelButton: showcancelButton,
    cancelButtonText: "ยกเลิก",
    cancelButtonColor: "#e10000",
    denyButtonText: "ให้คะแนนก่อน",
    denyButtonColor: "#FF8F3E",
    showDenyButton: showDenyButton,
  });
};

export { createSwal };
