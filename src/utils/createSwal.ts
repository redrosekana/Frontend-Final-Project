import Swal from "sweetalert2";

type IconSwal = "error" | "success" | "question" | "success" | "warning";

const createSwal = (
  title: string,
  text: string,
  icon: IconSwal,
  colorButton: string,
  showcancelButton: boolean = false
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
  });
};

export { createSwal };
