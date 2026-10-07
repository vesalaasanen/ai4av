---
spec_id: admin/request-intelligent-media-client
schema_version: ai4av-public-spec-v1
revision: 1
title: "ReQuest IMC Intelligent Media Client Control Spec"
manufacturer: ReQuest
model_family: "IMC Intelligent Media Client"
aliases: []
compatible_with:
  manufacturers:
    - ReQuest
  models:
    - "IMC Intelligent Media Client"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - request.com
source_urls:
  - "http://www.request.com/downloads/Integration%20-%20IMC%20Control_Protocol%20v100.pdf"
  - http://www.request.com/downloads/
retrieved_at: 2026-05-21T17:54:08.587Z
last_checked_at: 2026-10-07T15:43:24.328Z
generated_at: 2026-10-07T15:43:24.328Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no feedback/query commands, no response format, no safety warnings in source"
  - "no response/acknowledgement format documented in source"
  - "no settable parameters documented in source"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings in source"
  - "serial support is not stated in source; authentication is not specified; firmware version not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T15:43:24.328Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 action units match source hex codes (letters, numbers, symbols in order); port 3663 TCP confirmed; source has no additional commands. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# ReQuest IMC Intelligent Media Client Control Spec

## Summary
ReQuest IMC Intelligent Media Client controlled via TCP/IP on port 3663. Supports discrete power ON/OFF, navigation, playback, and alphanumeric text entry. No query/feedback commands documented. Authentication is UNRESOLVED; the source does not specify an authentication procedure.

<!-- UNRESOLVED: no feedback/query commands, no response format, no safety warnings in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 3663  # stated: "TCP/IP socket...on port 3663"
auth:
  type: UNRESOLVED  # source does not specify authentication
```

## Traits
```yaml
- powerable       # discrete Power ON and Power OFF present
- routable        # cursor navigation commands present
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
  hex: 0Bh 0Eh 5Ch 5Fh 7Fh 7Dh

- id: power_on
  label: Power ON
  kind: action
  params: []
  hex: 0Bh A4h 5Ch F5h 7Fh 7Dh

- id: power_off
  label: Power OFF
  kind: action
  params: []
  hex: 0Bh 24h 5Ch 75h 7Fh 7Dh

- id: home
  label: Home
  kind: action
  params: []
  description: Returns to home screen
  hex: 8Bh 86h DCh D7h 7Fh 7Dh

- id: cursor_down
  label: Cursor Down
  kind: action
  params: []
  hex: 0Bh 06h 5Ch 57h 7Fh 7Dh

- id: cursor_left
  label: Cursor Left
  kind: action
  params: []
  hex: 0Bh ACh 5Ch FDh 7Fh 7Dh

- id: cursor_right
  label: Cursor Right
  kind: action
  params: []
  hex: 0Bh 2Ch 5Ch 7Dh 7Fh 7Dh

- id: cursor_up
  label: Cursor Up
  kind: action
  params: []
  hex: 0Bh 86h 5Ch D7h 7Fh 7Dh

- id: page_down
  label: Page Down
  kind: action
  params: []
  hex: 29h A4h 7Eh F5h 7Fh 7Dh

- id: page_up
  label: Page Up
  kind: action
  params: []
  hex: 29h 0Ch 7Eh 5Dh 7Fh 7Dh

- id: jump_to_bottom
  label: Jump to Bottom of List
  kind: action
  params: []
  hex: 29h 84h 7Eh D5h 7Fh 7Dh

- id: jump_to_top
  label: Jump to Top of List
  kind: action
  params: []
  hex: 29h 24h 7Eh 75h 7Fh 7Dh

- id: enter
  label: Enter
  kind: action
  params: []
  hex: ABh 0Eh FCh 5Fh 7Fh 7Dh

- id: cancel
  label: Cancel
  kind: action
  params: []
  hex: 0Bh A6h 5Ch F7h 7Fh 7Dh

- id: eject
  label: Eject
  kind: action
  params: []
  hex: 2Bh 2Ch 7Ch 7Dh 7Fh 7Dh

- id: play
  label: Play
  kind: action
  params: []
  hex: 0Bh AEh 5Ch FFh 7Fh 7Dh

- id: stop
  label: Stop
  kind: action
  params: []
  hex: 8Bh 0Eh DCh 5Fh 7Fh 7Dh

- id: pause
  label: Pause
  kind: action
  params: []
  hex: 8Bh AEh DCh FFh 7Fh 7Dh

- id: next_chapter
  label: Next Chapter
  kind: action
  params: []
  hex: 8Bh 06h DCh 57h 7Fh 7Dh

- id: previous_chapter
  label: Previous Chapter
  kind: action
  params: []
  hex: 2Bh AEh 7Ch FFh 7Fh 7Dh

- id: fast_forward
  label: Fast Forward
  kind: action
  params: []
  hex: 2Bh 26h 7Ch 77h 7Fh 7Dh

- id: rewind
  label: Rewind
  kind: action
  params: []
  hex: 0Bh 2Eh 5Ch 7Fh 7Fh 7Dh

- id: dvd_menu
  label: DVD Menu
  kind: action
  params: []
  hex: 2Bh 0Eh 7Ch 5Fh 7Fh 7Dh

- id: angle
  label: Angle
  kind: action
  params: []
  hex: 8Bh 8Eh DCh DFh 7Fh 7Dh

- id: audio
  label: Audio
  kind: action
  params: []
  hex: 2Bh 86h 7Ch D7h 7Fh 7Dh

- id: subtitle
  label: Subtitle
  kind: action
  params: []
  hex: ABh 8Eh FCh DFh 7Fh 7Dh

- id: frame_advance
  label: Frame Advance
  kind: action
  params: []
  hex: 0Bh 26h 5Ch 77h 7Fh 7Dh

- id: text_space
  label: Text Space
  kind: action
  params: []
  hex: 89h AEh DEh FFh 7Fh 7Dh

- id: text_backspace
  label: Text Backspace
  kind: action
  params: []
  hex: 29h 04h 7Eh 55h 7Fh 7Dh

- id: text_lowercase_letter
  label: Text Lowercase Letter
  kind: action
  params:
    - name: letter
      type: enum
      values: [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z]
  description: Hex codes correspond in order to the letter values.
  hex: ["81h 2Eh D6h 7Fh 7Fh 7Dh", "81h 8Eh D6h DFh 7Fh 7Dh", "81h 0Eh D6h 5Fh 7Fh 7Dh", "81h A6h D6h F7h 7Fh 7Dh", "81h 26h D6h 77h 7Fh 7Dh", "81h 86h D6h D7h 7Fh 7Dh", "81h 06h D6h 57h 7Fh 7Dh", "81h ACh D6h FDh 7Fh 7Dh", "81h 2Ch D6h 7Dh 7Fh 7Dh", "81h 8Ch D6h DDh 7Fh 7Dh", "81h 0Ch D6h 5Dh 7Fh 7Dh", "81h A4h D6h F5h 7Fh 7Dh", "81h 24h D6h 75h 7Fh 7Dh", "81h 84h D6h D5h 7Fh 7Dh", "81h 04h D6h 55h 7Fh 7Dh", "01h AEh 56h FFh 7Fh 7Dh", "01h 2Eh 56h 7Fh 7Fh 7Dh", "01h 8Eh 56h DFh 7Fh 7Dh", "01h 0Eh 56h 5Fh 7Fh 7Dh", "01h A6h 56h F7h 7Fh 7Dh", "01h 26h 56h 77h 7Fh 7Dh", "01h 86h 56h D7h 7Fh 7Dh", "01h 06h 56h 57h 7Fh 7Dh", "01h ACh 56h FDh 7Fh 7Dh", "01h 2Ch 56h 7Dh 7Fh 7Dh", "01h 8Ch 56h DDh 7Fh 7Dh"]

- id: text_uppercase_letter
  label: Text Uppercase Letter
  kind: action
  params:
    - name: letter
      type: enum
      values: [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z]
  description: Hex codes correspond in order to the letter values.
  hex: ["A1h 2Eh F6h 7Fh 7Fh 7Dh", "A1h 8Eh F6h DFh 7Fh 7Dh", "A1h 0Eh F6h 5Fh 7Fh 7Dh", "A1h A6h F6h F7h 7Fh 7Dh", "A1h 26h F6h 77h 7Fh 7Dh", "A1h 86h F6h D7h 7Fh 7Dh", "A1h 06h F6h 57h 7Fh 7Dh", "A1h ACh F6h FDh 7Fh 7Dh", "A1h 2Ch F6h 7Dh 7Fh 7Dh", "A1h 8Ch F6h DDh 7Fh 7Dh", "A1h 0Ch F6h 5Dh 7Fh 7Dh", "A1h A4h F6h F5h 7Fh 7Dh", "A1h 24h F6h 75h 7Fh 7Dh", "A1h 84h F6h D5h 7Fh 7Dh", "A1h 04h F6h 55h 7Fh 7Dh", "21h AEh 76h FFh 7Fh 7Dh", "21h 2Eh 76h 7Fh 7Fh 7Dh", "21h 8Eh 76h DFh 7Fh 7Dh", "21h 0Eh 76h 5Fh 7Fh 7Dh", "21h A6h 76h F7h 7Fh 7Dh", "21h 26h 76h 77h 7Fh 7Dh", "21h 86h 76h D7h 7Fh 7Dh", "21h 06h 76h 57h 7Fh 7Dh", "21h ACh 76h FDh 7Fh 7Dh", "21h 2Ch 76h 7Dh 7Fh 7Dh", "21h 8Ch 76h DDh 7Fh 7Dh"]

- id: text_number
  label: Text Number
  kind: action
  params:
    - name: number
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  description: Hex codes correspond in order to the number values.
  hex: ["09h AEh 5Eh FFh 7Fh 7Dh", "09h 2Eh 5Eh 7Fh 7Fh 7Dh", "09h 8Eh 5Eh DFh 7Fh 7Dh", "09h 0Eh 5Eh 5Fh 7Fh 7Dh", "09h A6h 5Eh F7h 7Fh 7Dh", "09h 26h 5Eh 77h 7Fh 7Dh", "09h 86h 5Eh D7h 7Fh 7Dh", "09h 06h 5Eh 57h 7Fh 7Dh", "09h ACh 5Eh FDh 7Fh 7Dh", "09h 2Ch 5Eh 7Dh 7Fh 7Dh"]

- id: text_symbol
  label: Text Symbol
  kind: action
  params:
    - name: symbol
      type: enum
      values: ["'", "‐", "!", "\"", "#", "$", "%", "&", "(", ")", "?", "@", "[", "\\", "]", "^", ";", ":", "|", "{", "}", "~", "+", "<", "=", ">", "*", ",", ".", "/", "_", "`"]
  description: Hex codes correspond in order to the symbol values.
  hex: ["89h 06h DEh 57h 7Fh 7Dh", "89h 24h DEh 75h 7Fh 7Dh", "89h 2Eh DEh 7Fh 7Fh 7Dh", "89h 8Eh DEh DFh 7Fh 7Dh", "89h 0Eh DEh 5Fh 7Fh 7Dh", "89h A6h DEh F7h 7Fh 7Dh", "89h 26h DEh 77h 7Fh 7Dh", "89h 86h DEh D7h 7Fh 7Dh", "89h ACh DEh FDh 7Fh 7Dh", "89h 2Ch DEh 7Dh 7Fh 7Dh", "09h 04h 5Eh 55h 7Fh 7Dh", "A1h AEh F6h FFh 7Fh 7Dh", "21h 0Ch 76h 5Dh 7Fh 7Dh", "21h A4h 76h F5h 7Fh 7Dh", "21h 24h 76h 75h 7Fh 7Dh", "21h 84h 76h D5h 7Fh 7Dh", "09h 0Ch 5Eh 5Dh 7Fh 7Dh", "09h 8Ch 5Eh DDh 7Fh 7Dh", "01h A4h 56h F5h 7Fh 7Dh", "01h 0Ch 56h 5Dh 7Fh 7Dh", "01h 24h 56h 75h 7Fh 7Dh", "01h 84h 56h D5h 7Fh 7Dh", "89h 0Ch DEh 5Dh 7Fh 7Dh", "09h A4h 5Eh F5h 7Fh 7Dh", "09h 24h 5Eh 75h 7Fh 7Dh", "09h 84h 5Eh D5h 7Fh 7Dh", "89h 8Ch DEh DDh 7Fh 7Dh", "89h A4h DEh F5h 7Fh 7Dh", "89h 84h DEh D5h 7Fh 7Dh", "89h 04h DEh 55h 7Fh 7Dh", "21h 04h 76h 55h 7Fh 7Dh", "81h AEh D6h FFh 7Fh 7Dh"]
```

## Feedbacks
```yaml
# UNRESOLVED: no response/acknowledgement format documented in source
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings in source
```

## Notes
All commands documented as hex byte sequences. No ASCII command strings. No query commands. No response format. Port 3663 confirmed. IP address found via Settings > Network Settings on video output.
<!-- UNRESOLVED: serial support is not stated in source; authentication is not specified; firmware version not stated -->

## Provenance

```yaml
source_domains:
  - request.com
source_urls:
  - "http://www.request.com/downloads/Integration%20-%20IMC%20Control_Protocol%20v100.pdf"
  - http://www.request.com/downloads/
retrieved_at: 2026-05-21T17:54:08.587Z
last_checked_at: 2026-10-07T15:43:24.328Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T15:43:24.328Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 action units match source hex codes (letters, numbers, symbols in order); port 3663 TCP confirmed; source has no additional commands. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no feedback/query commands, no response format, no safety warnings in source"
- "no response/acknowledgement format documented in source"
- "no settable parameters documented in source"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings in source"
- "serial support is not stated in source; authentication is not specified; firmware version not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
