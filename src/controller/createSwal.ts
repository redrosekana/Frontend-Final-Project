//* import library
import Swal from "sweetalert2";

//* declare type
type IconSwal = "error" | "success" | "question" | "success" | "warning";

export const createSwal = (
  title: string,
  text: string,
  icon: IconSwal,
  colorButton: string
): any => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: colorButton,
  });
};
