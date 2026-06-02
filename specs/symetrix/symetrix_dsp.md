---
spec_id: admin/symetrix-integrator-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Symetrix Integrator Series DSP Control Spec"
manufacturer: Symetrix
model_family: "Deuce 722"
aliases: []
compatible_with:
  manufacturers:
    - Symetrix
  models:
    - "Deuce 722"
    - "Zone Mix 760"
    - "Zone Mix 761"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - symetrixinc.com
  - d3b79pswu7f4ma.cloudfront.net
  - symetrix.co
source_urls:
  - https://www.symetrixinc.com/wp-content/uploads/2023/11/Symetrix_IS_cp.pdf
  - https://www.symetrixinc.com/wp-content/uploads/2023/05/Symetrix_PROTOCOL_Jupiter_cp2.pdf
  - https://d3b79pswu7f4ma.cloudfront.net/pdf-download/Jupiter-Control-Protocol.pdf
  - https://www.symetrix.co/composer/
retrieved_at: 2026-05-17T18:27:04.721Z
last_checked_at: 2026-06-02T22:15:27.235Z
generated_at: 2026-06-02T22:15:27.235Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-485 control described as via ARC devices, not directly documented in this protocol spec"
  - "Controller numbers vary by product model - see appendix tables (Deuce 722, Zone Mix 760/761)"
  - "No explicit event names/types defined - push data is raw controller format"
  - "No explicit multi-step macros documented in source"
  - "No safety warnings, interlock procedures, or power sequencing documented in source"
  - "Product-specific controller number appendix (full table for Zone Mix 761 beyond line 1008, controller number ranges per model not summarized in source)"
  - "Binary command encodings, fault behavior, error recovery sequences not documented in source"
  - "Firmware version compatibility not stated in source"
  - "Specific device model (Deuce vs Zone Mix) determination via controller number not explicitly mapped"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:15:27.235Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Symetrix Integrator Series DSP Control Spec

## Summary
Symetrix Integrator Series DSP audio processors controllable via RS-232 and Ethernet (UDP). Text-based ASCII command protocol with carriage-return termination. Supports fader/button/selector/meter control via numbered controllers (1–10000). Push data architecture for unsolicited notifications.

<!-- UNRESOLVED: RS-485 control described as via ARC devices, not directly documented in this protocol spec -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 57600  # default; configurable via SB command (1200-115200)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 48630  # UDP port stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable   # GS, GS2, GSB, GSB2 commands return controller values
- routable    # Output routing commands (Output Route 2181-2686 per Zone Mix)
- levelable   # Faders, gain, EQ, compressor, limiter parameters
```

## Actions
```yaml
- id: cs
  label: Controller Set
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)
    - name: controller_position
      type: integer
      description: 16-bit position value (0-65535)
  command: "CS <CONTROLLER NUMBER> <CONTROLLER POSITION><CR>"

- id: cc
  label: Change Controller
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)
    - name: dec_inc
      type: integer
      description: "0=decrement, 1=increment"
    - name: amount
      type: integer
      description: Amount to increment/decrement (0-65535)
  command: "CC <CONTROLLER NUMBER> <DEC/INC> <AMOUNT><CR>"

- id: gs
  label: Get Controller
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)
  command: "GS <CONTROLLER NUMBER><CR>"

- id: gs2
  label: Get Controller with Number
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)
  command: "GS2 <CONTROLLER NUMBER><CR>"

- id: gsb
  label: Get Controller Block
  kind: action
  params:
    - name: start_controller
      type: integer
      description: Starting controller number (1-10000)
    - name: block_size
      type: integer
      description: Number of consecutive controllers (max 256)
  command: "GSB <CONTROLLER NUMBER> <BLOCK SIZE><CR>"

- id: gsb2
  label: Get Controller Block with Numbers
  kind: action
  params:
    - name: start_controller
      type: integer
      description: Starting controller number (1-10000)
    - name: block_size
      type: integer
      description: Number of consecutive controllers (max 256)
  command: "GSB2 <CONTROLLER NUMBER> <BLOCK SIZE><CR>"

- id: gpr
  label: Get Preset
  kind: action
  params: []
  command: "GPR D<CR>"

- id: fu
  label: Flash Unit
  kind: action
  params: []
  description: Momentarily flashes front panel LEDs
  command: "FU<CR>"

- id: lp
  label: Load Preset
  kind: action
  params:
    - name: preset_number
      type: integer
      description: Preset number (1-50)
  command: "LP <PRESET NUMBER><CR>"

- id: pu
  label: Global Push Enable/Disable
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0=OFF, 1=ON"
    - name: low
      type: integer
      description: Optional lowest controller number to push
    - name: high
      type: integer
      description: Optional highest controller number to push
  command: "PU <ON/OFF> [<LOW> [<HIGH>]]<CR>"

- id: pue
  label: Push Enable
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number
  command: "PUE [<LOW> [<HIGH>]]<CR>"

- id: pud
  label: Push Disable
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number
  command: "PUD [<LOW> [<HIGH>]]<CR>"

- id: gpu
  label: Get Push-enabled Controllers
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number
  command: "GPU [<LOW> [<HIGH>]]<CR>"

- id: pur
  label: Push Refresh
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number
  command: "PUR [<LOW> [<HIGH>]]<CR>"

- id: puc
  label: Push Clear
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number
  command: "PUC [<LOW> [<HIGH>]]<CR>"

- id: pui
  label: Set Push Interval
  kind: action
  params:
    - name: milliseconds
      type: integer
      description: Push interval in ms (20-30000, default 100)
  command: "PUI <MILLISECONDS><CR>"

- id: put
  label: Set Push Threshold
  kind: action
  params:
    - name: parameter_thresh
      type: integer
      description: Optional threshold for non-meter parameters (0-65535)
    - name: meter_thresh
      type: integer
      description: Optional threshold for meters (0-65535)
  command: "PUT [<PARAMETER THRESH>] [<METER THRESH>]<CR>"

- id: sb
  label: Set Baud
  kind: action
  params:
    - name: baud
      type: integer
      description: Baud rate (1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200)
  command: "SB <BAUD><CR>"

- id: sq
  label: Set Quiet Mode
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0=OFF, 1=ON"
  command: "SQ <ON/OFF><CR>"

- id: eh
  label: Set Echo Mode
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0=OFF, 1=ON"
  command: "EH <ON/OFF><CR>"
```

## Feedbacks
```yaml
- id: ack
  description: Command accepted
  response: "ACK<CR>"

- id: nak
  description: Command failed or interpreted but invalid
  response: "NAK<CR>"

- id: controller_position_response
  description: Response to GS command
  response: "<CONTROLLER POSITION><CR>"
  values:
    - 0-65535

- id: gs2_response
  description: Response to GS2 command
  response: "<CONTROLLER NUMBER> <CONTROLLER POSITION><CR>"

- id: gsb_response
  description: Response to GSB command
  response: Multiple "<CONTROLLER POSITIONn><CR>" lines, 5 digits with leading zeros, -1 for non-existent

- id: gsb2_response
  description: Response to GSB2 command
  response: "#<CONTROLLER NUMBER>=<CONTROLLER POSITION><CR>" per controller

- id: preset_response
  description: Response to GPR command
  response: "PrstD=<PRESET NUMBER><CR>"
  values:
    - "0000-0050 (4 digits, leading zeros)"

- id: push_data
  description: Unsolicited push data format
  response: "#<CONTROLLER NUMBER>=<CONTROLLER POSITION><CR>"
  notes: "Up to 64 strings per push interval; RS-232 and Ethernet ports operate independently except for push data"

- id: gpu_settings
  description: Response to GPU 0 (push settings)
  response: "Global=<0/1><CR>NNNNN NNNNN NNNNN NNNNN NNNNN<CR>"
  notes: "Global enable, lower limit, upper limit, parameter threshold, meter threshold, push interval (ms)"

- id: sq_response_off
  description: Response to SQ 0
  response: "Setting Quiet Mode to false.<CR>"
```

## Variables
```yaml
# Volume/Fader: 0-65535 maps to dB range (e.g., -72dB to +12dB for standard faders)
# Formula: Volume dB = MIN + (MAX - MIN)*(POSITION/65535)
# Button: 0=off, 65535=on (some buttons use negative logic, noted in controller appendix)
# Input Selector: 0=first input, 65535=last input; linear mapping via (INPUT-1)*65535/(N-1)
# Meter: Read-only, 0=-48dBu to 65535=+24dBu for main meters
# UNRESOLVED: Controller numbers vary by product model - see appendix tables (Deuce 722, Zone Mix 760/761)
```

## Events
```yaml
# Push data events emitted when parameters change (if push enabled):
# Format: #<CONTROLLER NUMBER>=<CONTROLLER POSITION><CR>
# - Emitted when control's underlying parameter changes
# - Emitted on PUR (Push Refresh) command
# - Default interval: 100ms (configurable via PUI, 20-30000ms)
# - Threshold-based: only pushes when value differs by threshold amount (default 1)
# UNRESOLVED: No explicit event names/types defined - push data is raw controller format
```

## Macros
```yaml
# UNRESOLVED: No explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: No safety warnings, interlock procedures, or power sequencing documented in source
```

## Notes

**Protocol format:** Text-based (ASCII), commands completed with carriage return <CR> (ASCII 13, hex $0D). Hex values prefixed with $. Optional parameters in [square brackets].

**Controller number ranges:**
- Deuce 722: Controllers 1-10000
- Zone Mix 760/761: Controllers 1-10000 for input processing; 2000+ for output processing; 6000+ for zone processing

**Serial vs Ethernet behavior:**
- RS-232 and Ethernet maintain separate quiet/echo/deaf mode settings
- Commands sent to one port are NOT echoed to the other
- Responses sent only to the port from which command was received
- Push data sent out BOTH ports in parallel
- If no valid packets received, pushed data not sent until first command received

**Volume dB conversion (standard -72dB to +12dB faders):**
`Volume dB = -72 + 84*(CONTROLLER POSITION/65535)`
`CONTROLLER POSITION = 0 → OFF (mute)`

**Meter dB conversion (main input/output meters):**
`Level dBu = 72*(CONTROLLER VALUE/65535) - 48`
`CONTROLLER VALUE = 0 → Level dBu <= -48 dBu`

**RS-232 default settings:** Baud 57600, Quiet Mode ON, Echo OFF

**Ethernet default settings:** Quiet Mode ON, Echo OFF

**RS-485 control:** Described as via Symetrix ARC devices, not directly via this protocol.

<!-- UNRESOLVED: Product-specific controller number appendix (full table for Zone Mix 761 beyond line 1008, controller number ranges per model not summarized in source) -->
<!-- UNRESOLVED: Binary command encodings, fault behavior, error recovery sequences not documented in source -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source -->
<!-- UNRESOLVED: Specific device model (Deuce vs Zone Mix) determination via controller number not explicitly mapped -->

## Provenance

```yaml
source_domains:
  - symetrixinc.com
  - d3b79pswu7f4ma.cloudfront.net
  - symetrix.co
source_urls:
  - https://www.symetrixinc.com/wp-content/uploads/2023/11/Symetrix_IS_cp.pdf
  - https://www.symetrixinc.com/wp-content/uploads/2023/05/Symetrix_PROTOCOL_Jupiter_cp2.pdf
  - https://d3b79pswu7f4ma.cloudfront.net/pdf-download/Jupiter-Control-Protocol.pdf
  - https://www.symetrix.co/composer/
retrieved_at: 2026-05-17T18:27:04.721Z
last_checked_at: 2026-06-02T22:15:27.235Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:15:27.235Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-485 control described as via ARC devices, not directly documented in this protocol spec"
- "Controller numbers vary by product model - see appendix tables (Deuce 722, Zone Mix 760/761)"
- "No explicit event names/types defined - push data is raw controller format"
- "No explicit multi-step macros documented in source"
- "No safety warnings, interlock procedures, or power sequencing documented in source"
- "Product-specific controller number appendix (full table for Zone Mix 761 beyond line 1008, controller number ranges per model not summarized in source)"
- "Binary command encodings, fault behavior, error recovery sequences not documented in source"
- "Firmware version compatibility not stated in source"
- "Specific device model (Deuce vs Zone Mix) determination via controller number not explicitly mapped"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
