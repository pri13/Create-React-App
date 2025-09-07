import React, { useCallback, useMemo, useRef, useState } from "react";
import Papa from "papaparse";

import {
    Upload,
    FileSpreadsheet,
    AlertCircle,
    X,
    Download,
    Loader2,
} from "lucide-react";

const MAX_FILE_SIZE_MB = 50;
const PREVIEW_ROW_LIMIT = 600;

// --- Helpers ---
function prettyBytes(bytes) {
    if (bytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
}

function downloadFile(filename, data, mime = "application/json") {
    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function formatCell(v) {
    if (v === null || v === undefined) return <span className="text-muted">—</span>;
    if (typeof v === "object") return <code className="small">{JSON.stringify(v)}</code>;
    return String(v);
}

// --- Main Component ---
const DataLoader = () => {
    const [file, setFile] = useState(null);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [error, setError] = useState("");
    const [parsing, setParsing] = useState(false);
    const [delimiter, setDelimiter] = useState(",");
    const inputRef = useRef(null);

    const parseCsv = useCallback(
        (f) => {
            setParsing(true);
            Papa.parse(f, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
                worker: true,
                delimiter,
                complete: (results) => {
                    const data = results.data || [];
                    const fields =
                        results.meta?.fields || (data[0] ? Object.keys(data[0]) : []);
                    setRows(data);
                    setColumns(fields);
                    setParsing(false);
                },
                error: (err) => {
                    setError(err?.message || "Failed to parse CSV.");
                    setParsing(false);
                },
            });
        },
        [delimiter]
    );

    const onFiles = useCallback(
        (files) => {
            const f = files?.[0];
            if (!f) return;

            if (!(f.type === "text/csv" || f.name.toLowerCase().endsWith(".csv"))) {
                setError("Please upload a .csv file.");
                return;
            }
            if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                setError(`File is too large (>${MAX_FILE_SIZE_MB} MB).`);
                return;
            }

            setError("");
            setFile(f);
            parseCsv(f);
        },
        [parseCsv]
    );

    const onDrop = useCallback(
        (e) => {
            e.preventDefault();
            onFiles(e.dataTransfer.files);
        },
        [onFiles]
    );

    const preview = useMemo(() => rows.slice(0, PREVIEW_ROW_LIMIT), [rows]);

    const clearAll = () => {
        setFile(null);
        setRows([]);
        setColumns([]);
        setError("");
    };

    const handleDownloadJson = () => {
        try {
            downloadFile(
                `${file?.name?.replace(/\\.csv$/i, "") || "data"}.json`,
                JSON.stringify(rows, null, 2)
            );
        } catch {
            setError("Could not export JSON.");
        }
    };

    return (
        <div className="container-fluid my-3">
            <div className="card shadow-sm">
                <div className="card-header  d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <FileSpreadsheet size={28} />
                        <div>
                            <h1 className="h5 mb-0">CSV File Uploader</h1>
                            <small className="text-muted">
                                Upload and preview CSV files directly in your browser
                            </small>
                        </div>
                    </div>
                    <div>

                        <div>
                            <label className="me-2">Delimiter:</label>
                            <select
                                className="form-select form-select-sm d-inline-block w-auto"
                                value={delimiter}
                                onChange={(e) => setDelimiter(e.target.value)}
                                onBlur={() => file && parseCsv(file)}
                            >
                                <option value=",">Comma (,)</option>
                                <option value=";">Semicolon (;)</option>
                                <option value="\\t">Tab (\\t)</option>
                                <option value="|">Pipe (|)</option>
                            </select>
                            {file && (
                                <button
                                    onClick={() => parseCsv(file)}
                                    className="btn btn-sm btn-outline-secondary ms-2"
                                >
                                    Re-parse
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="btn-group">
                        {rows.length > 0 && (
                            <button
                                onClick={handleDownloadJson}
                                className="btn btn-outline-secondary btn-sm"
                            >
                                <Download size={16} /> Export JSON
                            </button>
                        )}
                        <button onClick={clearAll} className="btn btn-outline-secondary btn-sm">
                            <X size={16} /> Reset
                        </button>
                    </div>
                </div>

                <div
                    className={`card-body rounded text-center p-5 ${error ? "border-danger" : "border-secondary"
                        }`}
                    onDrop={onDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => inputRef.current?.click()}
                    style={{ cursor: "pointer" }}>
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".csv,text/csv"
                        hidden
                        onChange={(e) => onFiles(e.target.files)}/>
                        
                    <Upload size={40} className="mb-2" />
                    <p className="mb-1">Drop your CSV here, or click to browse</p>
                    <small className="text-muted">
                        {file ? (
                            <>
                                Selected: <strong>{file.name}</strong> • {prettyBytes(file.size)}
                            </>
                        ) : (
                            <>.csv up to {MAX_FILE_SIZE_MB} MB</>
                        )}
                    </small>

                </div>
            </div>

            {error && (
                <div className="alert alert-danger d-flex align-items-center mt-3">
                    <AlertCircle size={18} className="me-2" />
                    <div>
                        <strong>Upload error:</strong> {error}
                    </div>
                </div>
            )}

            {(file || rows.length > 0) && (
                <div className="row my-3 g-3">
                    <div className="col-md">
                        <div className="card card-body shadow">
                            <small className="text-muted">File Name:</small> <hr />
                            <div>{file?.name || "—"}</div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="card card-body shadow">
                            <small className="text-muted">Row(s) Count:</small> <hr />
                            <div>{rows.length.toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="card card-body shadow">
                          <small className="text-muted">Column(s) Count: </small> <hr />
                            <div>{columns.length}</div>
                        </div>
                    </div>
                </div>
            )}

            {parsing && (
                <div className="alert alert-info d-flex align-items-center mt-3">
                    <Loader2 className="me-2" size={16} /> Parsing CSV…
                </div>
            )}

            {rows.length > 0 && (
                <div className="card shadow-sm mt-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Preview</strong>
                            <div className="text-muted small">
                                Showing first {PREVIEW_ROW_LIMIT} rows (of{" "}
                                {rows.length.toLocaleString()})
                            </div>
                        </div>
                        <small className="text-muted">
                            Delimiter: <code>{delimiter}</code>
                        </small>
                    </div>
                    <div className="table-responsive" >
                        <table className="table table-sm table-bordered table-striped mb-0 text-center">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    {columns.map((col) => (
                                        <th key={col}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {preview.map((row, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        {columns.map((col) => (
                                            <td key={col}>{formatCell(row[col])}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataLoader;
