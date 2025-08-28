import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  // State lưu 6 ký tự của mã code, khởi tạo là ["", "", "", "", "", ""]
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  // useRef để lưu danh sách ref của từng ô input, giúp focus tới/lui
  const inputRefs = useRef([]);

  // Hook dùng để điều hướng sau khi verify thành công
  const navigate = useNavigate();

  const { isLoading, error, verifyEmail } = useAuthStore();

  // Xử lý khi người dùng nhập vào 1 ô input
  const handleChange = (index, value) => {
    const newCode = [...code];

    // Nếu người dùng paste nhiều ký tự 1 lúc (ví dụ paste nguyên 6 số)
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split(""); // Lấy tối đa 6 ký tự
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || ""; // Gán từng ký tự vào mảng code
      }
      setCode(newCode);

      // Sau khi paste xong: focus tới ô cuối có dữ liệu, hoặc ô đầu trống
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      // Người dùng gõ từng ký tự
      newCode[index] = value;
      setCode(newCode);

      // Nếu có nhập và chưa phải ô cuối thì tự động focus sang ô tiếp theo
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Xử lý phím Backspace: nếu ô hiện tại rỗng thì focus về ô trước
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Hàm submit form (chưa viết logic verify, hiện tại chỉ preventDefault)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail(code.join(""));
      navigate("/");
      toast.success("Verification successful!");
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  // Khi tất cả 6 ô đều đã nhập thì tự động submit
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }} // hiệu ứng ban đầu
        animate={{ opacity: 1, y: 0 }} // hiệu ứng khi hiển thị
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Tiêu đề */}
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        {/* Form nhập code */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)} // gắn ref từng ô input
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Nút submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)} // disable nếu chưa đủ 6 ký tự hoặc đang loading
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
