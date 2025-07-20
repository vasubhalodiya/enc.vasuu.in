import '@/common/VaultsCommon.css';

const ContainerCreate = ({ onClose, title, children }) => {
  return (
    <div className="login-create-wrapper">
      <div className="login-create-overlay"></div>
      <div className="vaultsData ContainerCreate">
        <div className="vd-header">
          <div className="vd-close">
            <button className="vd-close-btn mini-master-btn" onClick={onClose}>
              <i className="fa-regular fa-xmark"></i>
            </button>
          </div>
          <div className="vd-sec">
            <div className="vd-create">
              <button className="vd-create-btn">{title}</button>
            </div>
          </div>
        </div>
        <div className="vaultsData-cnt">{children}</div>
      </div>
    </div>
  );
};

export default ContainerCreate;
