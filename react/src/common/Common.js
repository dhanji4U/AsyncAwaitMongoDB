
import ExcelJS from 'exceljs';
import moment from 'moment-timezone';
// import S3 from 'react-aws-s3';
import Swal from "sweetalert2";

export function exportExcelFile(column, Data, fileName) {

    const workbook = new ExcelJS.Workbook();
    const workSheet = workbook.addWorksheet("Report-Data");
    workSheet.columns = column

    const headerRow = workSheet.getRow(1);

    //For header
    headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFC0C0C0' }, // Light gray color for the header background
        };
        cell.alignment = { horizontal: 'center' };
    });

    //adding the data ro sheet
    Data.forEach(element => {
        workSheet.addRow(element)
    });

    // Center align the cells
    workSheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        row.eachCell({ includeEmpty: true }, function (cell) {
            cell.alignment = { horizontal: 'center' };
        });
    });


    workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = fileName;
        anchor.click();
        window.URL.revokeObjectURL(url);
    });

}

export function excelUpload(file) {

    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader();


    return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
            const arrayBuffer = e.target.result;
            const data = new Uint8Array(arrayBuffer);

            try {
                await workbook.xlsx.load(data);

                // Assuming the first sheet is the one you want to read
                const sheet = workbook.getWorksheet(1);
                const dataArray = [];

                // Iterate through rows and cells
                sheet.eachRow((row, rowNumber) => {
                    if (rowNumber !== 1) {
                        dataArray.push(row.values)
                    }
                });

                resolve(dataArray);
            } catch (error) {
                reject(new Error('Error reading Excel file:', error.message));
            }
        };

        reader.readAsArrayBuffer(file);
    });
}

export function removeSessionStorageData() {

    localStorage.removeItem("ReactTimezone");
    localStorage.removeItem("ReactLogin");
    localStorage.removeItem("ReactToken");
    localStorage.removeItem("ReactID");
    localStorage.removeItem("ReactName");
    localStorage.removeItem("ReactEmail");
    localStorage.removeItem("ReactID");
    localStorage.removeItem("ReactImage");
    localStorage.removeItem("ReactData")
}

export function setSessionStorageData(data) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    localStorage.setItem("ReactTimezone", timeZone);
    localStorage.setItem("ReactLogin", true);
    localStorage.setItem("ReactToken", data.token);
    localStorage.setItem("ReactName", data.name);
    localStorage.setItem("ReactEmail", data.email);
    localStorage.setItem("ReactID", data._id);
    localStorage.setItem("ReactImage", data.profile_image);
    localStorage.setItem("ReactData", data)

}

export function uploadImageS3(params) {

    // const config = {
    //     bucketName: process.env.REACT_APP_S3_NAME,
    //     region: process.env.REACT_APP_S3_REGION,
    //     accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    //     secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
    //     s3Url: process.env.REACT_APP_S3URL,
    //     dirName: params.dirName,
    // };


    // const ReactS3Client = new S3(config);


    const files = params.file;
    // var newfile = new Date().getTime() + files.name

    return files.name;

    // ReactS3Client.uploadFile(files, newfile).then(data => {

    //     if (data.status === 204) {
    //         console.log(data);
    //         return files.name;
    //     } else {
    //         console.log('obj err')
    //     }
    // });



    // const config = {
    //     bucketName: process.env.REACT_APP_S3_NAME,
    //     region: process.env.REACT_APP_S3_REGION,
    //     accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    //     secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
    //     s3Url: process.env.REACT_APP_S3URL,
    //     dirName: "React_profile",
    // };
    // const ReactS3Client = new S3(config);

    // const handleFileInput = (e) => {

    //     const files = e.target.files[0];
    //     var newfile = new Date().getTime() + files.name

    //     ReactS3Client.uploadFile(files, newfile).then(data => {
    //         if (data.status === 204) {
    //             setProfileImage(data.location.split("/")[4])
    //         } else {
    //             console.log('obj err')
    //         }
    //     });
    // }


}

export const dateTimeConvert = (ConvertDate, Format) => {
    // localStorage.setItem("ReactTimezone", timeZone)
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const newDate = moment(ConvertDate).tz(timeZone).format(Format)
    // console.log(`Old Date = ${ConvertDate} AND New Date ${newDate}`);
    return newDate;
}

export function ErrorAlert(data, msg) {
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: data || msg,
        toast: true,
        showConfirmButton: false,
        timer: 1500,
    });
}

export function SuccessAlert(data, msg) {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: data || msg,
        toast: true,
        showConfirmButton: false,
        timer: 1500,
    });
}

export function SimpleAlert(data, msg) {
    Swal.fire({
        position: "top-end",
        icon: "alert",
        title: data || msg,
        toast: true,
        showConfirmButton: false,
        timer: 1500,
    });
}

export function confirmChangeStatus() {
    Swal.fire({
        title: 'Are you sure you want to delete?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#02C9D6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

        if (result.isConfirmed) {
            // console.log("userId " + userId)
            console.log(`Confirm true`)
            return true
        } else {
            console.log(`Confirm false`)
            return false
        }

    })
}

export function processing() {
    Swal.fire({
        title: 'Please wait...',
        didOpen: () => {
            Swal.showLoading()
        }
    })
}