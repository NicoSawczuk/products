import { useState, useCallback } from 'react';
import { createMuiTheme } from "@material-ui/core/styles";
import {
    lightBlue,
    indigo, 
    pink,
    red,
    orange,
    green,
    grey,
    deepOrange
  } from "@material-ui/core/colors";

export default function useTheme() {
    const theme = window.sessionStorage.getItem('dark') === null ||window.sessionStorage.getItem('dark') === 'true' ? true : false
    const [darkState, setDarkState] = useState(theme);
    const palletType = darkState ? "dark" : "light";
    const mainPrimaryColor = darkState ? green['A200'] : deepOrange['A200'];
    const mainSecondaryColor = darkState ? pink[400] : lightBlue[300];
    const mainErrorColor = darkState ? red[500] : red[500];
    const mainWarningColor = darkState ? orange[500] : orange[500];
    const mainInfoColor = darkState ? lightBlue[500] : lightBlue[500];
    const mainSuccessColor = darkState ? green[500] : green[500];
    const mainBackGroundColor = darkState ? grey[900] : "#FFFFFF";
    const inheritBackGroundColor = darkState ? "#b3e5fc" : "#f8bbd0";
    const darkTheme = createMuiTheme({
        palette: {
            type: palletType,
            background: {
                default: mainBackGroundColor,
            },
            primary: {
                main: mainPrimaryColor,
            },
            secondary: {
                main: mainSecondaryColor
            },
            error: {
                main: mainErrorColor
            },
            warning: {
                main: mainWarningColor
            },
            info: {
                main: mainInfoColor
            },
            success: {
                main: mainSuccessColor
            }
            
        }
    });

    const changeTheme = useCallback((value) => {
        setDarkState(!value);
        window.sessionStorage.setItem('dark', !value)
    }, [darkState])

    return{
        darkTheme,
        changeTheme,
        darkState
    }
}