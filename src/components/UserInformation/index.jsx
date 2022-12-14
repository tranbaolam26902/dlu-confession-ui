import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useStore } from '../../store';
import styles from './UserInformation.module.scss';

import EditModal from './EditModal';

const cx = classNames.bind(styles);

function UserInformation() {
    // React's hooks
    const navigate = useNavigate();

    // Global states
    // eslint-disable-next-line
    const [states, dispatch] = useStore();
    const { apiURL, avatarURL } = states;

    // Component's states
    const [userInformation, setUserInformation] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const [joinDay, setJoinDay] = useState(1);
    const [joinMonth, setJoinMonth] = useState(1);
    const [joinYear, setJoinYear] = useState(2022);
    const [isVertical, setIsVertical] = useState(true);

    // Variables
    const userId = window.location.pathname.split('/').pop();

    // Functions
    const getUserInfo = () => {
        const formData = new FormData();
        formData.append('id', userId);
        fetch(`${apiURL}/api/Account/GetUserInfo`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((responseUserInformation) => {
                setUserInformation(responseUserInformation);
                const joinDate = responseUserInformation.UserProfile.Birthday.split('-');
                setJoinDay(joinDate[2].split('T')[0]);
                setJoinMonth(joinDate[1]);
                setJoinYear(joinDate[0]);
            });
    };

    // Event handlers
    const handleLoadAvatar = () => {
        const img = new Image();
        img.src = `${avatarURL}${userInformation.UserProfile.Avatar}`;
        img.onload = () => {
            if (img.height > img.width) setIsVertical(true);
            else setIsVertical(false);
        };
    };

    useEffect(() => {
        getUserInfo();
        // eslint-disable-next-line
    }, [navigate]);

    return (
        <div className={cx('wrapper')}>
            {userInformation.Id ? (
                <>
                    <div className='d-flex align-items-center justify-content-between'>
                        <h5 className={cx('title')}>Th??ng tin c?? nh??n</h5>
                        {userInformation.Id === states.userId ? (
                            <h5>
                                <button className={cx('edit')} onClick={() => setShowEditModal(true)}>
                                    Ch???nh s???a
                                </button>
                            </h5>
                        ) : null}
                    </div>
                    <hr className='mt-2 mb-0' />
                    <div className={cx('body')}>
                        <div className={cx('avatar')}>
                            <img
                                src={avatarURL + userInformation.UserProfile.Avatar}
                                className={cx({
                                    isVertical: isVertical,
                                })}
                                onLoad={handleLoadAvatar}
                                alt='avatar'
                            />
                        </div>
                        <h4 className='mt-3 fw-bold'>{userInformation.UserProfile.NickName}</h4>
                        {userInformation.UserProfile.Description ? (
                            <h5>
                                <i>{userInformation.UserProfile.Description}</i>
                            </h5>
                        ) : null}
                        <div className='mt-3'>
                            <div>
                                <span className='fw-bold'>Ng??y tham gia: </span>
                                <span>{joinDay + ' th??ng ' + joinMonth + ', ' + joinYear}</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            {userInformation.Id ? (
                <EditModal data={userInformation} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
            ) : null}
        </div>
    );
}

export default UserInformation;
