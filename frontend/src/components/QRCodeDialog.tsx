import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface QRCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeImage: string | null;
}

export default function QRCodeDialog({
  isOpen,
  onClose,
  qrCodeImage,
}: QRCodeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ticket QR Code</DialogTitle>
          <DialogDescription>
            Scan the QR code below to view your ticket details.
          </DialogDescription>
        </DialogHeader>
        {qrCodeImage && (
          <div className="flex justify-center my-4">
            <img src={qrCodeImage} alt="Ticket QR Code" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
