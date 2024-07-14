// "use client";

// import React, { useState, ChangeEvent } from "react";
// import { Modal, Box, TextField, Button } from "@mui/material";
// import { useFormik, FormikHelpers } from "formik";
// import * as yup from "yup";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createClient } from "@/supabase/client";
// import { useAuth } from "@/contexts/auth.context";

// interface FormValues {
//   commentContent: string;
// }

// const validationSchema = yup.object({
//   commentContent: yup.string().required("내용을 입력해 주세요"),
// });

// interface CommentModalProps {
//   open: boolean;
//   handleClose: () => void;
//   postId: string;
// }

// const CommentModal: React.FC<CommentModalProps> = ({
//   open,
//   handleClose,
//   postId,
// }) => {
//   const { isLoggedIn, me, userData } = useAuth();
//   const queryClient = useQueryClient();
//   const [confirmCancel, setConfirmCancel] = useState(false);
//   const [successModalOpen, setSuccessModalOpen] = useState(false);

//   const supabase = createClient();

//   const mutation = useMutation({
//     mutationFn: async (values: FormValues) => {
//       const { data, error } = await supabase
//         .from("comments")
//         .insert({
//           content: values.commentContent,
//           post_id: postId,
//           user_id: me?.id,
//         })
//         .single();

//       if (error) throw error;

//       return data;
//     },
//     onSuccess: () => {
//       setSuccessModalOpen(true);
//       queryClient.invalidateQueries(["comments", postId]);
//     },
//     onError: (error: any) => {
//       console.error("Error submitting the form", error);
//     },
//   });

//   const formik = useFormik<FormValues>({
//     initialValues: { commentContent: "" },
//     validationSchema,
//     onSubmit: (values, { setSubmitting }: FormikHelpers<FormValues>) => {
//       mutation.mutate(values);
//       setSubmitting(false);
//     },
//   });

//   const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
//     formik.handleChange(event);
//   };

//   const handleCancel = () => {
//     setConfirmCancel(true);
//   };

//   const confirmCancelClose = () => {
//     setConfirmCancel(false);
//   };

//   const confirmCancelExit = () => {
//     setConfirmCancel(false);
//     handleClose();
//   };

//   const handleSuccessClose = () => {
//     setSuccessModalOpen(false);
//     handleClose();
//   };

//   return (
//     <>
//       <Modal open={open} onClose={handleCancel}>
//         <Box
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[600px]"
//           style={{ minHeight: "600px" }}
//         >
//           <form onSubmit={formik.handleSubmit} className="space-y-4">
//             <div className="flex justify-between items-center">
//               <Button onClick={handleCancel} className="text-gray-500">
//                 취소
//               </Button>
//               <Button
//                 type="submit"
//                 className={`py-1 px-4 rounded ${
//                   formik.values.commentContent && isLoggedIn
//                     ? "text-blue-500"
//                     : "text-gray-400"
//                 }`}
//                 disabled={!formik.values.commentContent || !isLoggedIn}
//               >
//                 게시
//               </Button>
//             </div>
//             <div className="flex items-center">
//               <img
//                 src={userData?.imageUrl || "/assets/images/profile-placeholder.png"}
//                 alt="프로필"
//                 className="w-10 h-10 rounded-full mr-2"
//               />
//               {isLoggedIn ? (
//                 <div className="text-gray-500">
//                   {userData?.nickname || me?.email}
//                 </div>
//               ) : (
//                 <div className="text-red-500">로그인이 필요합니다.</div>
//               )}
//             </div>
//             <div className="border border-gray-300 rounded-lg p-4 space-y-4">
//               <TextField
//                 fullWidth
//                 id="commentContent"
//                 name="commentContent"
//                 placeholder="댓글을 작성해 보세요!"
//                 multiline
//                 rows={6}
//                 value={formik.values.commentContent}
//                 onChange={handleDescriptionChange}
//                 InputProps={{ disableUnderline: true }}
//               />
//             </div>
//           </form>
//         </Box>
//       </Modal>

//       <Modal open={confirmCancel} onClose={confirmCancelClose}>
//         <Box
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
//           style={{ minHeight: "200px", minWidth: "300px" }}
//         >
//           <div className="text-center">
//             <p className="text-lg mb-4">댓글 작성을 중단하시겠습니까?</p>
//             <Button onClick={confirmCancelClose} className="text-gray-500 mr-4">
//               취소
//             </Button>
//             <Button onClick={confirmCancelExit} className="text-blue-500">
//               나가기
//             </Button>
//           </div>
//         </Box>
//       </Modal>

//       <Modal open={successModalOpen} onClose={handleSuccessClose}>
//         <Box
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
//           style={{ minHeight: "200px", minWidth: "300px" }}
//         >
//           <div className="text-center">
//             <p className="text-lg mb-4">댓글이 작성되었습니다!</p>
//             <Button onClick={handleSuccessClose} className="text-blue-500">
//               확인
//             </Button>
//           </div>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default CommentModal;
