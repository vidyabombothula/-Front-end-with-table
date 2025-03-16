'use client'
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

interface PreviewBoxProps {
    data: {
        channel_id: string;
        channel_name: string;
        type: string;
        country: string;
        url_variants: string;
        dt: string;
        sampled: string;
        hit_status: string;
        join: string;
        bf: string;
        spend: string;
        impressions: string;
        clicks: string;
        cpm: string;
        cpa_per_click: string | null;
        cpa_per_result: string | null;
        results: string | null;
    };
    onClose: () => void;
}

const PreviewBox: React.FC<PreviewBoxProps> = ({ data, onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div 
                className="preview-box"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="preview-header">
                    <h5>{data.channel_name}</h5>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}>×</button>
                </div>
                <div className="preview-content">
                    <p><strong>Channel ID:</strong> {data.channel_id}</p>
                    <p><strong>Type:</strong> {data.type}</p>
                    <p><strong>Country:</strong> {data.country}</p>
                    <p><strong>Campaign:</strong> {data.dt}</p>
                    <p><strong>Spend:</strong> {data.spend}</p>
                </div>
            </div>

            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{data.channel_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-content-details">
                        <div className="row">
                            <div className="col-md-6">
                                <p><strong>Channel ID:</strong> {data.channel_id}</p>
                                <p><strong>Type:</strong> {data.type}</p>
                                <p><strong>Country:</strong> {data.country}</p>
                                <p><strong>URL Variants:</strong> {data.url_variants}</p>
                                <p><strong>Campaign:</strong> {data.dt}</p>
                                <p><strong>Sampled:</strong> {data.sampled}</p>
                                <p><strong>Hit Status:</strong> {data.hit_status}</p>
                                <p><strong>Join:</strong> {data.join}</p>
                            </div>
                            <div className="col-md-6">
                                <p><strong>BF:</strong> {data.bf}</p>
                                <p><strong>Spend:</strong> {data.spend}</p>
                                <p><strong>Impressions:</strong> {data.impressions}</p>
                                <p><strong>Clicks:</strong> {data.clicks}</p>
                                <p><strong>CPM:</strong> {data.cpm}</p>
                                <p><strong>CPA per Click:</strong> {data.cpa_per_click || 'N/A'}</p>
                                <p><strong>CPA per Result:</strong> {data.cpa_per_result || 'N/A'}</p>
                                <p><strong>Results:</strong> {data.results || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PreviewBox;