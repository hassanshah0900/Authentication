"use client";

import { deleteAccount } from "@/lib/actions/auth-actions";
import { useTransition } from "react";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";

export default function DeleteAccountButton() {
  const [isPending, startTransition] = useTransition();
  function handleAccountDelete() {
    startTransition(async () => {
      const state = await deleteAccount();
      if (state?.error) toast(state.error, { type: "error" });
    });
  }

  return (
    <ConfirmModal
      onConfirm={handleAccountDelete}
      isPending={isPending}
      buttonText="Delete My Account"
    >
      Are you sure that you want to delete your account?
    </ConfirmModal>
  );
}
