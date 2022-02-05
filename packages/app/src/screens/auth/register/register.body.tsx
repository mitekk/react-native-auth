import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {RegisterScreenNavigationProp} from './register.screen';

type RegisterBodyProps = {
  onSubmit: () => void;
};

export const RegisterBody = ({onSubmit}: RegisterBodyProps) => {
  const theme = useTheme();
  const [passwordSecured, setPasswordSecured] = useState(false);
  const {navigate} = useNavigation<RegisterScreenNavigationProp>();

  const {
    control,
    formState: {errors},
  } = useFormContext();

  return (
    <View>
      <View>
        <Controller
          control={control}
          render={({field: {onChange, value, onBlur}}) => (
            <View>
              <TextInput
                activeUnderlineColor={theme?.colors?.nickel}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="name"
                autoComplete="name"
                label={'Name'}
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                style={{backgroundColor: theme.colors.background}}
                theme={theme}
              />
              <HelperText theme={theme} type="error" visible={!!errors?.name}>
                {errors?.name?.message}
              </HelperText>
            </View>
          )}
          name="name"
        />

        <Controller
          control={control}
          render={({field: {onChange, value, onBlur}}) => (
            <View>
              <TextInput
                activeUnderlineColor={theme?.colors?.nickel}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                autoComplete="email"
                label={'Email'}
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                style={{backgroundColor: theme.colors.background}}
                theme={theme}
              />
              <HelperText theme={theme} type="error" visible={!!errors?.email}>
                {errors?.email?.message}
              </HelperText>
            </View>
          )}
          name="email"
        />

        <Controller
          control={control}
          render={({field: {onChange, value, onBlur}}) => (
            <View>
              <TextInput
                autoCapitalize="none"
                activeUnderlineColor={theme?.colors?.nickel}
                autoCorrect={false}
                textContentType="newPassword"
                autoComplete="password"
                secureTextEntry={!passwordSecured}
                label={'Password'}
                value={value}
                onBlur={() => {
                  setPasswordSecured(false);
                  onBlur();
                }}
                onChangeText={value => onChange(value)}
                style={{backgroundColor: theme.colors.background}}
                theme={theme}
                right={
                  <TextInput.Icon
                    color={theme.colors.anzac}
                    theme={theme}
                    name="eye"
                    onPress={() => setPasswordSecured(!passwordSecured)}
                  />
                }
              />
              <HelperText
                theme={theme}
                type="error"
                visible={!!errors?.password}>
                {errors?.password?.message}
              </HelperText>
            </View>
          )}
          name="password"
        />
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          paddingVertical: 15,
        }}>
        <Button
          theme={theme}
          uppercase={false}
          style={{backgroundColor: theme.colors.anzac, marginVertical: 15}}
          labelStyle={{
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: 17,
          }}
          onPress={onSubmit}>
          Sign up
        </Button>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              marginVertical: 15,
              fontSize: 16,
            }}>
            Have an account?{' '}
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigate('Login');
            }}>
            <Text
              style={{
                color: theme.colors.anzac,
                fontFamily: theme?.fonts?.medium?.fontFamily,
                fontSize: 17,
              }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};