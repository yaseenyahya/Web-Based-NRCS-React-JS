

export default class otherMethods {

    exportXls(
        fileName,
        data,
    ) {
        var arrayBuffer = [new Uint8Array(data)];
        var blob = new Blob(arrayBuffer, { type: "application/vnd.ms-excel" });
        var url = URL.createObjectURL(blob);


            const a = document.createElement('a');

            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        
    }
}
