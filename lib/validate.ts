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

  [FORM_SIGN.username]: yup.string().trim().required("Tên là bắt buộc"),
  [FORM_SIGN.level]: yup.string().required("Khóa học là bắt buộc"),
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
  level: yup.string().required("Khóa học là bắt buộc"),
  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{9,}$/, "Số điện thoại không hợp lệ, phải có 9 chữ số"),
  role: yup.string(),
  skills: yup.array().of(yup.string()),
  forte: yup.array().of(yup.string()),
  description: yup.string(),
  year: yup.string(),
});

export const validationTeamSchema = yup.object().shape({
  teamName: yup.string().trim().required("Tên là bắt buộc"),
  teamLeader: yup.string().trim(),
  description: yup.string().trim().required("Mô tả là bắt buộc"),
});

export const validationEventSchema = yup.object().shape({
  eventName: yup.string().trim().required("Tiêu đề là bắt buộc"),
  description: yup.string().trim().required("Mô tả là bắt buộc"),
  location: yup.string().trim().required("Địa điểm là bắt buộc"),
  eventDate: yup.string().required("Ngày là bắt buộc"),
  startTime: yup.string().required("Thời gian là bắt buộc"),
});

export const validationDeviceSchema = yup.object().shape({
  name: yup.string().trim().required("Tên là bắt buộc"),
  type: yup.string().trim().required("Loại thiết bị là bắt buộc"),
  status: yup.string().required("Trạng thái là bắt buộc"),
  statusHealth: yup.string().required("Tình trạng là bắt buộc"),
});

export const validationReturnDeviceSchema = yup.object().shape({
  statusHealth: yup.string().required("Tình trạng là bắt buộc"),
});
