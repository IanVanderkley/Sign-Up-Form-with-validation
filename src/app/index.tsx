import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import {
  Controller,
  useForm,
  type Control,
  type FieldPath,
} from "react-hook-form";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import { signUpSchema, type SignUpValues } from "../schemas/signup-schema";

type FormFieldProps = {
  control: Control<SignUpValues>;
  name: FieldPath<SignUpValues>;
  label: string;
  secure?: boolean;
  email?: boolean;
};

function FormField({ control, name, label, secure, email }: FormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder={label}
            accessibilityLabel={label}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secure}
            keyboardType={email ? "email-address" : "default"}
            autoCapitalize={email || secure ? "none" : "words"}
            autoCorrect={false}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </>
      )}
    />
  );
}

export default function SignUpScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit({ firstName, lastName, email }: SignUpValues) {
    // Passwords are intentionally excluded from the submission log.
    console.log("Sign-up form submitted:", { firstName, lastName, email });

    router.push({
      pathname: "/confirmation",
      params: { firstName },
    });
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Enter your information below.</Text>

      <FormField control={control} name="firstName" label="First Name" />
      <FormField control={control} name="lastName" label="Last Name" />
      <FormField control={control} name="email" label="Email" email />
      <FormField control={control} name="password" label="Password" secure />
      <FormField
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        secure
      />

      <Pressable
        style={styles.button}
        onPress={() => {
          handleSubmit(onSubmit)();
        }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#DC2626",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 28,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
