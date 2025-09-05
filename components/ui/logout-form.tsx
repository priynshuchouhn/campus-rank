import { signOutAction } from "@/lib/actions/signout";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { LogOut } from "lucide-react";

export default function LogoutForm({ withSheetClose }: { withSheetClose?: boolean }) {
    return (
        <>
            {withSheetClose ? (
                <SheetClose asChild>
                    {/* <form action={signOutAction}> */}
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => signOutAction()}
                            className="flex items-center justify-start gap-2 w-full text-red-500"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </Button>
                    {/* </form> */}
                </SheetClose>
            ) : (
                <form action={signOutAction}>
                    <Button
                        type="submit"
                        variant="ghost"
                        className="flex items-center justify-start gap-2 w-full text-red-500"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </Button>
                </form>
            )}
        </>
    );
}
