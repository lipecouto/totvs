import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Checkbox,
    Typography,
    FormControlLabel 
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
 
import AnimateButton from '../../Components/animations/AnimatedButton';
import { strengthColor, strengthIndicator } from '../../utils/password-strength';

// assets
import { Visibility, VisibilityOff } from '@mui/icons-material';

// ============================|| FIREBASE - REGISTER ||============================ //

const Register = () => {
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [autoPassword, setAutoPassword] = useState(false);
    const [showPassInput, setshowPassInput] = useState('');
    const [autoPass, setAutoPass] = useState({
                                            number: false,
                                            letter: false,
                                            espChar: false,
                                            passlength: ''
                                          })
    const [btnLabel, setBtnLabel] = useState('Salvar senha')

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    const handleCheck = () =>{
        setAutoPassword(!autoPassword)
        if(!autoPassword){
            setBtnLabel('Gerar Senha')
        }else{
            setBtnLabel('Salvar senha')
        }
            
        if(showPassInput === 'none'){
            setshowPassInput('')
            return
        }
        setshowPassInput('none')
    }
  
    const handleCheckBox = (el) => {
        
        if(el.target.id === 'passlength'){
            setAutoPass({...autoPass, [ el.target.id ]: el.target.value })
        }
        else{
            setAutoPass({...autoPass, [ el.target.id ]: el.target.checked })
        }
          
    }


    useEffect(() => {
        changePassword('');
       
    }, []);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Grid
                container
                direction="column"
                justifyContent="space-around"
                sx={{
                    minHeight: '100vh'
                }}
            >
                <Grid container 
                    direction="row" 
                    justifyContent="space-around"
                    margin={1}
                >
                    <Grid container item xs={11} lg={4} spacing={2} 
                            sx={{
                                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px'
                            }}
                        >
                        <Grid item xs={11} lg={11} 
                         >
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                    submit: null
                                }}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string().email('O email deve ser válido').max(255).required('Tem que digitar um email'),
                                    password: Yup.string().max(255).required('Tem que digitar uma senha')
                                })}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                    try {
                                        setStatus({ success: false });
                                        setSubmitting(false);
                                    } catch (err) {
                                        console.error(err);
                                        setStatus({ success: false });
                                        setErrors({ submit: err.message });
                                        setSubmitting(false);
                                    }
                                }}
                            >
                                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>                                              
                                            <Grid item xs={12}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="email-signup">Digite seu Email</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        error={Boolean(touched.email && errors.email)}
                                                        id="email-login"
                                                        type="email"
                                                        value={values.email}
                                                        name="email"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="demo@company.com"
                                                        inputProps={{}}
                                                    />
                                                    {touched.email && errors.email && (
                                                        <FormHelperText error id="helper-text-email-signup">
                                                            {errors.email}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                
                                                <Stack spacing={1}>
                                                    <FormControlLabel
                                                        labelPlacement="start"
                                                        control={<Checkbox
                                                                onChange={handleCheck}
                                                                {...label}
                                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}/>}
                                                        label='Gerar senha Aleatória?'
                                                    />
                                                        
                                                    
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} display={showPassInput? '' : 'none'}>
                                                <Stack spacing={1} justifyContent="flex-start" alignItems="flex-start"  divider={<Divider orientation="horizontal" flexItem />}>
                                                    <Typography variant="paramtitle" fontSize="1.25rem" sx={{backgroundColor: 'transparent'}} >
                                                                Defina os parametros para senha
                                                    </Typography>
                                                    <FormControlLabel
                                                        
                                                        labelPlacement="end"
                                                        control={<Checkbox
                                                                id='number'
                                                                onChange={handleCheckBox}
                                                                {...label}
                                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}/>}
                                                        label='Deve conter números'
                                                    />
                                                     <FormControlLabel
                                                        labelPlacement="end"
                                                        control={<Checkbox
                                                                id='letter'
                                                                onChange={handleCheckBox}
                                                                {...label}
                                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}/>}
                                                        label='Deve conter letras'
                                                    />
                                                     <FormControlLabel
                                                        labelPlacement="end"
                                                        control={<Checkbox
                                                                id='espChar'
                                                                onChange={handleCheckBox}
                                                                {...label}
                                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}/>}
                                                        label='Deve conter caracteres especiais'
                                                    />
                                                    <Grid item xs={12} lg={12}  sx={{width: '100%'}}>
                                                        <FormControlLabel
                                                            sx={{width: '100%'}}
                                                             
                                                            labelPlacement="top"
                                                            control={<OutlinedInput
                                                                        fullWidth
                                                                        id='passlength'
                                                                        onChange={handleCheckBox}
                                                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}/>}
                                                            label='Quantidade de caracteres'
                                                        />
                                                    </Grid>
                                                    <Divider />
                                                </Stack>
                                               
                                            </Grid>
                                            <Grid item xs={12} display={showPassInput}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="password-signup">Defina uma senha</InputLabel>
                                                    <OutlinedInput
                                                        disabled={autoPassword}
                                                        fullWidth
                                                        error={Boolean(touched.password && errors.password)}
                                                        id="password-signup"
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={values.password}
                                                        name="password"
                                                        onBlur={handleBlur}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            changePassword(e.target.value);
                                                        }}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                    size="large"
                                                                >
                                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        placeholder="******"
                                                        inputProps={{}}
                                                    />
                                                    {touched.password && errors.password && (
                                                        <FormHelperText error id="helper-text-password-signup">
                                                            {errors.password}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                                <FormControl fullWidth sx={{ mt: 2 }}>
                                                    <Grid container spacing={2} alignItems="center">
                                                        <Grid item>
                                                            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                                {level?.label}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </FormControl>
                                            </Grid>
                                            {errors.submit && (
                                                <Grid item xs={12}>
                                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                                </Grid>
                                            )}

                                            <Grid item xs={6} lg={6}>
                                                <Stack> 
                                                    <InputLabel htmlFor="email-signup">Definir tempo de vida</InputLabel>
                                                    <OutlinedInput
                                                        
                                                        error={Boolean(touched.lifetime && errors.lifetime)}
                                                        id="pass-lifetime"
                                                        type="number"
                                                        value={values.lifetime}
                                                        name="passlifetime"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Valores em horas"
                                                        inputProps={{}}
                                                    />
                                                    {touched.lifetime && errors.lifetime && (
                                                        <FormHelperText error id="helper-text-email-signup">
                                                            {errors.lifetime}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={6} lg={6}>
                                                <Stack sx={{ minWidth: 0 }}>
                                                    <InputLabel htmlFor="email-signup">Máximo de visualizações</InputLabel>
                                                    <OutlinedInput
                                                        
                                                        error={Boolean(touched.maxview && errors.maxview)}
                                                        id="passlink-maxview"
                                                        type="number"
                                                        value={values.maxview}
                                                        name="maxview"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Link poderá ser aberto n vezes"
                                                        inputProps={{}}
                                                    />
                                                    {touched.maxview && errors.maxview && (
                                                        <FormHelperText error id="helper-text-email-signup">
                                                            {errors.maxview}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <AnimateButton>
                                                    <Button
                                                        disableElevation
                                                        disabled={isSubmitting}
                                                        fullWidth
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        {btnLabel}
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider>
                                                    <Link variant="return" component={RouterLink}  color="text.primary" fontSize={15}  to='/'>Voltar para Login</Link>
                                                </Divider>
                                            </Grid>
                                            <Grid item xs={12}>
                                                
                                            </Grid>
                                        </Grid>
                                    </form>
                                )}
                            </Formik>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Register;