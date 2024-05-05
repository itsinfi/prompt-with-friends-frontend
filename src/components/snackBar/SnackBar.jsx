import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const snackBarOptions = { position: 'top-right', autoClose: 3000, theme: "light"}

/**
 * A Snack Bar that displays a message
 * 
 * IMPORTANT: import and add </ToastContainer> at the end of html!!! otherwise wont work!!!
 * 
 * @param message message to display
 * @returns snackbar displaying message
 */
function DefaultSnackBar(message) {
    return () => toast(message, snackBarOptions)
}
/**
 * A Snack Bar that displays a success
 * 
 * IMPORTANT: import and add </ToastContainer> at the end of html!!! otherwise wont work!!!
 * 
 * @param message message to display
 * @returns snackbar displaying message
 */
function SuccessSnackBar(message) {
    return () => toast.success(message, snackBarOptions);
}
/**
 * A Snack Bar that displays a warning
 * 
 * IMPORTANT: import and add </ToastContainer> at the end of html!!! otherwise wont work!!!
 * 
 * @param message message to display
 * @returns snackbar displaying message
 */
function WarningSnackBar(message) {
    return () => toast.warning(message, snackBarOptions)
}
/**
 * A Snack Bar that displays an error
 * 
 * IMPORTANT: import and add </ToastContainer> at the end of html!!! otherwise wont work!!!
 * 
 * @param message message to display
 * @returns snackbar displaying message
 */
function ErrorSnackBar(message) {
    return () => toast.error(message, snackBarOptions)
}
/**
 * A Snack Bar that displays an info
 * 
 * IMPORTANT: import and add </ToastContainer> at the end of html!!! otherwise wont work!!!
 * 
 * @param message message to display
 * @returns snackbar displaying message
 */
function InfoSnackBar(message) {
    return () => toast.info(message, snackBarOptions)
}


export { DefaultSnackBar, SuccessSnackBar, ErrorSnackBar, WarningSnackBar, InfoSnackBar }
