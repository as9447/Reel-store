import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateVideoPrice,
  validateInstaPayHandle,
  validateWalletNumber,
  validateBankTransfer,
  formatCurrencyEGP
} from './pricing';

test('calculateVideoPrice computes correct pricing for base duration', () => {
  const result = calculateVideoPrice(1000, { durationSeconds: 30 });
  assert.equal(result.basePrice, 1000);
  assert.equal(result.durationMultiplier, 1);
  assert.equal(result.addonsTotal, 0);
  assert.equal(result.subtotal, 1000);
  assert.equal(result.platformFee, 50); // 5% of 1000
  assert.equal(result.total, 1050);
});

test('calculateVideoPrice applies correct multipliers for 15s and 60s videos with addons', () => {
  // 15 seconds video (0.85x) with scriptwriting (250) + subtitles (150)
  const result15 = calculateVideoPrice(1000, {
    durationSeconds: 15,
    scriptWriting: true,
    subtitles: true
  });
  assert.equal(result15.durationMultiplier, 0.85);
  assert.equal(result15.addonsTotal, 400);
  assert.equal(result15.subtotal, 850 + 400); // 1250
  assert.equal(result15.platformFee, Math.round(1250 * 0.05)); // 63
  assert.equal(result15.total, 1250 + 63);

  // 60s video with rush delivery (350)
  const result60 = calculateVideoPrice(2000, {
    durationSeconds: 60,
    rushDelivery: true
  });
  assert.equal(result60.durationMultiplier, 1.5);
  assert.equal(result60.addonsTotal, 350);
  assert.equal(result60.subtotal, 3000 + 350); // 3350
  assert.equal(result60.total, 3350 + Math.round(3350 * 0.05));
});

test('validateInstaPayHandle correctly validates valid and invalid handles', () => {
  assert.equal(validateInstaPayHandle('karim@instapay').isValid, true);
  assert.equal(validateInstaPayHandle('01012345678').isValid, true);
  assert.equal(validateInstaPayHandle('creator.reel').isValid, true);
  
  assert.equal(validateInstaPayHandle('').isValid, false);
  assert.equal(validateInstaPayHandle('   ').isValid, false);
});

test('validateWalletNumber validates Egyptian mobile wallet prefixes (010, 011, 012, 015)', () => {
  assert.equal(validateWalletNumber('01012345678').isValid, true);
  assert.equal(validateWalletNumber('01198765432').isValid, true);
  assert.equal(validateWalletNumber('01234567890').isValid, true);
  assert.equal(validateWalletNumber('01555544433').isValid, true);
  assert.equal(validateWalletNumber('010 1234 5678').isValid, true); // handles spaces

  // Invalid numbers
  assert.equal(validateWalletNumber('01912345678').isValid, false);
  assert.equal(validateWalletNumber('12345').isValid, false);
  assert.equal(validateWalletNumber('01012345678999').isValid, false);
});

test('validateBankTransfer checks minimum length for reference code', () => {
  assert.equal(validateBankTransfer('TXN-9847291').isValid, true);
  assert.equal(validateBankTransfer('12345').isValid, true);
  assert.equal(validateBankTransfer('12').isValid, false);
  assert.equal(validateBankTransfer('').isValid, false);
});

test('formatCurrencyEGP returns formatted string with currency', () => {
  const formatted = formatCurrencyEGP(1500);
  assert.ok(formatted.includes('1') && (formatted.includes('ج.م') || formatted.includes('EGP')));
});
