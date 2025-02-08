import { ImageSource, Application } from '@nativescript/core';

export function showImagePreview(base64Image: string) {
    if (Application.android) {
        const activity = Application.android.foregroundActivity;
        const intent = new android.content.Intent();
        intent.setAction(android.content.Intent.ACTION_VIEW);
        
        const imageSource = ImageSource.fromBase64(base64Image);
        const path = org.nativescript.widgets.Utils.getApplicationContext()
            .getExternalCacheDir().getAbsolutePath() + "/temp_preview.jpg";
        imageSource.saveToFile(path, "jpg");
        
        const uri = androidx.core.content.FileProvider.getUriForFile(
            activity,
            Application.android.context.getPackageName() + ".provider",
            new java.io.File(path)
        );
        
        intent.addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION);
        intent.setDataAndType(uri, "image/*");
        activity.startActivity(intent);
    } else if (Application.ios) {
        const imageSource = ImageSource.fromBase64(base64Image);
        const image = imageSource.ios;
        const controller = UIViewController.alloc().init();
        const imageView = UIImageView.alloc().initWithImage(image);
        imageView.contentMode = UIViewContentMode.ScaleAspectFit;
        imageView.frame = controller.view.bounds;
        controller.view.addSubview(imageView);
        controller.modalPresentationStyle = UIModalPresentationStyle.FullScreen;
        UIApplication.sharedApplication.keyWindow.rootViewController
            .presentViewControllerAnimatedCompletion(controller, true, null);
        
        const tapGesture = UITapGestureRecognizer.alloc().initWithTargetAction(
            controller,
            "dismissController"
        );
        controller.view.addGestureRecognizer(tapGesture);
        controller.dismissController = () => {
            controller.dismissViewControllerAnimatedCompletion(true, null);
        };
    }
}