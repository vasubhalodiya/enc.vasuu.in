import React, { useEffect, useRef, useState } from 'react';
import './Vaults.css';

const Vaults = () => {
  const vaultsRef = useRef(null);
  const listRef = useRef(null);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const container = vaultsRef.current;
    const list = listRef.current;

    if (!container || !list) return;

    const updateArrowVisibility = () => {
      const canScroll = container.scrollHeight > container.clientHeight;
      const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
      setShowArrow(canScroll && !atBottom);
    };

    updateArrowVisibility();

    container.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);

    const observer = new MutationObserver(updateArrowVisibility);
    observer.observe(list, { childList: true });

    return () => {
      container.removeEventListener('scroll', updateArrowVisibility);
      window.removeEventListener('resize', updateArrowVisibility);
      observer.disconnect();
    };
  }, []);

  const items = Array(62).fill().map((_, i) => `auth pass ${i + 1}`);

  return (
    <div className="vaults" ref={vaultsRef}>
      <div className="vaults-cnt">
        <div className="vaults-add-multiselect">
          <button className="vaults-multiselect"><i className="fa-light fa-check-double"></i>Multiple Select</button>
          <button className="vaults-filter"><i className="fa-regular fa-clock"></i>Recent</button>
        </div>

        <div className="vaults-list-group">
          <h6 className="vaults-title master-title">Vaults</h6>
          <div className="vaults-menu">
            <ul className="vaults-menu-list" ref={listRef}>
              {items.map((label, i) => (
                <li key={i}>
                  <button className="vaults-menu-item">
                    <i className="fa-light fa-user"></i>{label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {showArrow && (
          <div className="vaults-scroll-down">
            <div className="vaults-scroll-down-txt">
              <i className="fa-regular fa-chevron-down"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vaults;
