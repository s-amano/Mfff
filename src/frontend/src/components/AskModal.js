import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(3),
  },
}));

const AskModal = ({ ask, askFromUser, modalIsOpen, setModalIsOpen }) => {
  const classes = useStyles();
  const { user, profile, profiles, users, askList, changeApprovalRequest } = useContext(ApiContext);

  const changeApproval = () => {
    const uploadDataAsk = new FormData();
    uploadDataAsk.append('askTo', ask.askTo);
    uploadDataAsk.append('approved', true);
    changeApprovalRequest(uploadDataAsk, ask);
    setModalIsOpen(false);
  };

  return (
    <>
      {!ask.approved ? (
        <li className="list-item">
          <h4 style={{ marginRight: '3%' }}>{askFromUser[0].username}</h4>

          <Button
            size="small"
            className="btn-modal"
            variant="contained"
            color="primary"
            onClick={() => changeApproval()}
          >
            承認する
          </Button>
        </li>
      ) : (
        <></>
      )}
    </>
  );
};

export default AskModal;
