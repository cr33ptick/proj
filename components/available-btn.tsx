"use client";
import { useState } from "react";
import { Switch } from "./ui/switch";
import { useServerAction } from "@/hooks/use-server-actions";
import { available } from "@/actions";

interface Props {
  item: {
    id: string;
    available: boolean;
  };
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AvailableBtn({ item }: Props) {
  const [runAction, loading] = useServerAction(available);

  const [userChoice, setUserChoice] = useState({
    approved: item.available,
  });

  const handleChange = (id: string) => {
    if (userChoice.approved) {
      setUserChoice({ approved: false });
    } else {
      setUserChoice({ approved: true });
    }
    // console.log(id, !userChoice.approved);
    runAction({ verified: !userChoice.approved, id }).then(() => {
      //   window.location.reload();
    });
  };

  return (
    <>
      <div className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        <Switch
          checked={userChoice.approved}
          onCheckedChange={() => handleChange(item.id)}
          className={classNames(
            userChoice.approved ? "bg-primary-600" : "bg-gray-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              userChoice.approved ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>
    </>
  );
}
