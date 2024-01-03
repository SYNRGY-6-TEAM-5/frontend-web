import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Chrome, Facebook, Github, Loader } from "lucide-react";
import { useState } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginForm = ({ className, ...props }: UserAuthFormProps) => {
	const [isPending, setIsPending] = useState<boolean>();

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form
				onSubmit={() => {
					setIsPending(true);
				}}
			>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='email'>
							Email
						</Label>
						<Input id='email' placeholder='Your email here...' type='email' autoCapitalize='none' autoComplete='off' autoCorrect='off' />
					</div>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='password'>
							Password
						</Label>
						<Input id='password' placeholder='Your password here...' type='password' autoCapitalize='none' autoComplete='off' autoCorrect='off' />
					</div>
					<Button type='submit'>
						{isPending && <Loader className='mr-2 h-4 w-4 animate-spin' />}
						Sign In with Email
					</Button>
				</div>
			</form>
			<div className='relative'>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background text-muted-foreground px-2'>Or continue with</span>
				</div>
			</div>
			<div className='flex justify-between'>
				<Button variant='outline' type='button' disabled={isPending}>
					{isPending ? <Loader className='mr-2 h-4 w-4 animate-spin' /> : <Chrome className='mr-2 h-4 w-4' />}
					Google
				</Button>
				<Button variant='outline' type='button' disabled={isPending}>
					{isPending ? <Loader className='mr-2 h-4 w-4 animate-spin' /> : <Github className='mr-2 h-4 w-4' />}
					Github
				</Button>
				<Button variant='outline' type='button' disabled={isPending}>
					{isPending ? <Loader className='mr-2 h-4 w-4 animate-spin' /> : <Facebook className='mr-2 h-4 w-4' />}
					Facebook
				</Button>
			</div>
		</div>
	);
};

export default LoginForm;
