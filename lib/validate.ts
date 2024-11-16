import { FORM_SIGN } from "@/constants/auth";
import * as yup from "yup";

export const validationLoginSchema = yup.object().shape({
  [FORM_SIGN.email]: yup
    .string()
    .required("Email là bắt buộc")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Địa chỉ email không hợp lệ"
    ),
  [FORM_SIGN.password]: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  // .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa')
  // .matches(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái viết thường')
  // .matches(/[0-9]/, 'Mật khẩu phải chứa ít nhất một số')
  // .matches(/[@$!%*?&#]/, 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt'),
});

export const validationRegisterSchema = yup.object().shape({
  ...validationLoginSchema.fields,

  [FORM_SIGN.username]: yup
    .string()
    .trim()
    .required("Tên là bắt buộc")
    .matches(/^[A-Za-z\s]*$/, "Tên không được chứa ký tự đặc biệt"),
  [FORM_SIGN.courseNumber]: yup.string().required("Khóa học là bắt buộc"),
  [FORM_SIGN.phone]: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ, phải có 10 chữ số"),
  [FORM_SIGN.confirmPassword]: yup
    .string()
    .oneOf([yup.ref(FORM_SIGN.password), undefined], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

export const validationUserSchema = yup.object().shape({
  username: yup.string().trim().required("Tên là bắt buộc"),
  email: yup
    .string()
    .required("Email là bắt buộc")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Địa chỉ email không hợp lệ"
    ),
  courseNumber: yup.string().required("Khóa học là bắt buộc"),
  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{9,}$/, "Số điện thoại không hợp lệ, phải có 9 chữ số"),
  role: yup.string(),
  skill: yup.string(),
  year: yup.string(),
});

export const validationTeamSchema = yup.object().shape({
  teamName: yup.string().trim().required("Tên là bắt buộc"),
  description: yup.string().trim().required("Mô tả là bắt buộc"),
  members: yup.array().min(1, "Ít nhất một thành viên"),
  // status: yup.string().required("Trạng thái là bắt buộc"),
  // teamLeader: yup.object({
  //   value: yup.string().required("Trưởng nhóm là bắt buộc"),
  //   label: yup.string().required("Trưởng nhóm là bắt buộc"),
  // }).required("Trưởng nhóm là bắt buộc"),
});

export const validationEventSchema = yup.object().shape({
  eventName: yup.string().trim().required("Tiêu đề là bắt buộc"),
  description: yup.string().trim().required("Mô tả là bắt buộc"),
  location: yup.string().trim().required("Địa điểm là bắt buộc"),
  eventDate: yup.date().required("Ngày là bắt buộc"),
  time: yup.string().required("Thời gian là bắt buộc"),
});

export const validationDeviceSchema = yup.object().shape({
  name: yup.string().trim().required("Tên là bắt buộc"),
  type: yup.string().trim().required("Loại thiết bị là bắt buộc"),
  status: yup.string().required("Trạng thái là bắt buộc"),

  // description: yup.string().trim().required("Mô tả là bắt buộc"),
  // category: yup.string().required("Danh mục là bắt buộc"),
  // quantity: yup.number().required("Số lượng là bắt buộc").typeError("Số lượng phải là số"),
});
