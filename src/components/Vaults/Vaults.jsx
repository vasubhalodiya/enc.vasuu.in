// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import './Vaults.css';
// import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
// import { db } from '@/firebase';
// import { useNavigate, useParams } from 'react-router-dom';

// const Vaults = ({ searchQuery }) => {
//   const vaultsRef = useRef(null);
//   const listRef = useRef(null);
//   const [showArrow, setShowArrow] = useState(false);
//   const [vaultItems, setVaultItems] = useState([]);
//   const [loading, setLoading] = useState(true); // <-- Added
//   const navigate = useNavigate();
//   const { vaultId } = useParams();

//   const handleVaultClick = (vault) => {
//     const urlVaultId = vault.vaultId || vault.id;
//     if (urlVaultId !== vaultId) {
//       navigate(`/vault/${urlVaultId}`);
//     }
//   };

  
//   useEffect(() => {
//     const userToken = localStorage.getItem('userToken');
//     if (!userToken) return;

//     const q = query(
//       collection(db, `users/${userToken}/vaults`),
//       orderBy('createdAt', 'asc')
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setVaultItems(data);
//       setLoading(false); // <-- set loading false when data fetched
//     });
//     return () => unsubscribe();
//   }, []);

//   const filteredVaults = useMemo(() => {
//     if (!searchQuery || searchQuery.trim() === '') {
//       return vaultItems;
//     }
//     const query = searchQuery.toLowerCase().trim();
//     return vaultItems.filter(vault =>
//       vault.title?.toLowerCase().includes(query) ||
//       vault.type?.toLowerCase().includes(query) ||
//       vault.username?.toLowerCase().includes(query) ||
//       vault.content?.toLowerCase().includes(query)
//     );
//   }, [vaultItems, searchQuery]);

//   useEffect(() => {
//     const container = vaultsRef.current;
//     const list = listRef.current;
//     if (!container || !list) return;

//     const updateArrowVisibility = () => {
//       const canScroll = container.scrollHeight > container.clientHeight;
//       const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
//       setShowArrow(canScroll && !atBottom);
//     };

//     updateArrowVisibility();
//     container.addEventListener('scroll', updateArrowVisibility);
//     window.addEventListener('resize', updateArrowVisibility);

//     const observer = new MutationObserver(updateArrowVisibility);
//     observer.observe(list, { childList: true });

//     return () => {
//       container.removeEventListener('scroll', updateArrowVisibility);
//       window.removeEventListener('resize', updateArrowVisibility);
//       observer.disconnect();
//     };
//   }, []);

//   const getIconClass = (type) => {
//     switch (type) {
//       case 'login':
//         return 'fa-light fa-user';
//       case 'card':
//         return 'fa-light fa-credit-card';
//       case 'note':
//         return 'fa-light fa-notes';
//       default:
//         return 'fa-light fa-hexagon-exclamation';
//     }
//   };

//   if (loading) {  // <-- Loading screen
//     return (
//       <div className="vaults" ref={vaultsRef}>
//         <div className="loader-container">
//           <div class="loader"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="vaults" ref={vaultsRef}>
//       <div className="vaults-cnt">
//         <div className="vaults-add-multiselect">
//           <button className="vaults-multiselect"><i className="fa-light fa-check-double"></i>Multiselect</button>
//           <button className="vaults-filter"><i className="fa-regular fa-clock"></i>Recent</button>
//         </div>

//         <div className="vaults-list-group">
//           <h6 className="vaults-title master-title">Vaults</h6>
//           <div className="vaults-menu">
//             <ul className="vaults-menu-list" ref={listRef}>
//               {filteredVaults.map(vault => {
//                 const urlVaultId = vault.vaultId || vault.id;
//                 return (
//                   <li key={vault.id} className="vaults-menu-item-group">
//                     <button
//                       className={`vaults-menu-item ${vault.type} ${vaultId === urlVaultId ? 'active' : ''}`}
//                       onClick={() => handleVaultClick(vault)}
//                     >
//                       <div className="vaults-group-list">
//                         <div className='vaults-menu-type'>
//                           <i className={`${getIconClass(vault.type)} ${['login', 'card', 'note'].includes(vault.type) ? vault.type : 'error'}`}></i>
//                         </div>
//                         <h4>{vault.title}</h4>
//                       </div>
//                       <div className="vaults-group-error">
//                         {!['login', 'card', 'note'].includes(vault.type) && (
//                           <h6 className="vault-list-error-txt">Error</h6>
//                         )}
//                       </div>
//                     </button>
//                     <div>
//                       <button className="vaults-menu-three-dot-btn">
//                         <i className="fa-regular fa-ellipsis-vertical"></i>
//                       </button>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>

//         {showArrow && (
//           <div className="vaults-scroll-down">
//             <div className="vaults-scroll-down-txt">
//               <i className="fa-regular fa-chevron-down"></i>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Vaults;

import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Vaults.css';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/firebase';
import { useNavigate, useParams } from 'react-router-dom';

const Vaults = ({ searchQuery, onLoaded }) => {
  const vaultsRef = useRef(null);
  const listRef = useRef(null);
  const [showArrow, setShowArrow] = useState(false);
  const [vaultItems, setVaultItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 575);
  const navigate = useNavigate();
  const { vaultId } = useParams();

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 575);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleVaultClick = (vault) => {
    const urlVaultId = vault.vaultId || vault.id;
    if (urlVaultId !== vaultId) {
      navigate(`/vault/${urlVaultId}`);
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) return;

    const q = query(
      collection(db, `users/${userToken}/vaults`),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVaultItems(data);
      setLoading(false);
      onLoaded?.();
    });
    return () => unsubscribe();
  }, [onLoaded]);

  const filteredVaults = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return vaultItems;
    }
    const query = searchQuery.toLowerCase().trim();
    return vaultItems.filter(vault =>
      vault.title?.toLowerCase().includes(query) ||
      vault.type?.toLowerCase().includes(query) ||
      vault.username?.toLowerCase().includes(query) ||
      vault.content?.toLowerCase().includes(query)
    );
  }, [vaultItems, searchQuery]);

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

  const getIconClass = (type) => {
    switch (type) {
      case 'login':
        return 'fa-light fa-user';
      case 'card':
        return 'fa-light fa-credit-card';
      case 'note':
        return 'fa-light fa-notes';
      default:
        return 'fa-light fa-hexagon-exclamation';
    }
  };

  if (loading && isMobile) {
    return (
      <div className="vaults" ref={vaultsRef}>
        <div className="mobile-loader-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  // Remove the individual loading screen since Home will handle it
  return (
    <div className="vaults" ref={vaultsRef}>
      <div className="vaults-cnt">
        <div className="vaults-add-multiselect">
          <button className="vaults-multiselect"><i className="fa-light fa-check-double"></i>Multiselect</button>
          <button className="vaults-filter"><i className="fa-regular fa-clock"></i>Recent</button>
        </div>

        <div className="vaults-list-group">
          <h6 className="vaults-title master-title">Vaults</h6>
          <div className="vaults-menu">
            <ul className="vaults-menu-list" ref={listRef}>
              {filteredVaults.map(vault => {
                const urlVaultId = vault.vaultId || vault.id;
                return (
                  <li key={vault.id} className="vaults-menu-item-group">
                    <button
                      className={`vaults-menu-item ${vault.type} ${vaultId === urlVaultId ? 'active' : ''}`}
                      onClick={() => handleVaultClick(vault)}
                    >
                      <div className="vaults-group-list">
                        <div className='vaults-menu-type'>
                          <i className={`${getIconClass(vault.type)} ${['login', 'card', 'note'].includes(vault.type) ? vault.type : 'error'}`}></i>
                        </div>
                        <h4>{vault.title}</h4>
                      </div>
                      <div className="vaults-group-error">
                        {!['login', 'card', 'note'].includes(vault.type) && (
                          <h6 className="vault-list-error-txt">Error</h6>
                        )}
                      </div>
                    </button>
                    <div>
                      <button className="vaults-menu-three-dot-btn">
                        <i className="fa-regular fa-ellipsis-vertical"></i>
                      </button>
                    </div>
                  </li>
                );
              })}
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