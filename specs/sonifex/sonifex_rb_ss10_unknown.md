---
spec_id: admin/sonifex-rb-dmx4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sonifex RB-DMX4 Control Spec"
manufacturer: Sonifex
model_family: RB-DMX4
aliases: []
compatible_with:
  manufacturers:
    - Sonifex
  models:
    - RB-DMX4
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ad56550c.delivery.rocketcdn.me
  - sonifex.co.uk
source_urls:
  - https://ad56550c.delivery.rocketcdn.me/wp-content/uploads/products/RB-SS10/redbox-06_hb.pdf
  - https://sonifex.co.uk/wp-content/uploads/products/RB-SS10/redbox-06_hb.pdf
retrieved_at: 2026-09-03T02:40:18.373Z
last_checked_at: 2026-09-21T22:17:26.052Z
generated_at: 2026-09-21T22:17:26.052Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source file is named `sonifex_rb_ss10_unknown` but actually contains RB-DMX4, RB-IPE, RB-TGHD protocol material. RB-SS10 content is not present in this source. Spec covers RB-DMX4 only. RB-IPE and RB-TGHD protocol details are extracted in this spec's Source Coverage Notes."
  - "section kept for schema completeness - no source-evidenced variables."
  - "source does not describe multi-step macro sequences."
  - "source does not state explicit safety warnings, interlocks, or"
verification:
  verdict: verified
  checked_at: 2026-09-21T22:17:26.052Z
  matched_actions: 16
  action_count: 16
  confidence: medium
  summary: "All 16 spec actions match RB-DMX4 wire-literal commands verbatim in source; transport params 19200/8/E/1/XON-XOFF and pin assignments present; one-to-one coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Sonifex RB-DMX4 Control Spec

## Summary
The Sonifex RB-DMX4 is a one-to-four mono distribution amplifier / dual mono creator providing four mono outputs from up to four digital audio inputs. This spec covers RS-232 serial control via the Sonifex Serial Control Interface (SCI) protocol: a 3-letter ASCII command set terminated by CR (optional LF), with `-ACK:` responses and structured status reports.

<!-- UNRESOLVED: Source file is named `sonifex_rb_ss10_unknown` but actually contains RB-DMX4, RB-IPE, RB-TGHD protocol material. RB-SS10 content is not present in this source. Spec covers RB-DMX4 only. RB-IPE and RB-TGHD protocol details are extracted in this spec's Source Coverage Notes. -->

## Transport
```yaml
# RB-DMX4 uses RS-232 serial exclusively per source.
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: even
  stop_bits: 1
  flow_control: xon_xoff
  connector: "DB-9 (D-sub 9-pin); Pin 2 TX, Pin 3 RX, Pin 5 GND; pin-to-pin cable to PC"
auth:
  type: none  # inferred: no login/password/auth procedure described in source
```

**Framing (verbatim from source):**
- 3-letter command, colon, parameter(s), CR terminator (optional LF ignored).
- Commands are not case sensitive.
- Responses are CR & LF terminated.
- On power-up the unit sends an initialisation string `Initialising DMX4`.

## Traits
```yaml
- routable   # inferred: source select / mix matrix commands present
- queryable  # inferred: FPS: and SRQ: status queries present
- levelable  # inferred: input gain (IG) and output gain (OG) commands present
```

## Actions
```yaml
# Enumerated from the RB-DMX4 Serial Interface Commands and Responses table.
# Each distinct command-bearing row from the source is a separate action.
# Parameterized values within a single command are not split into separate actions.

- id: baudrate_change
  label: Set Baud Rate
  kind: action
  command: "B{nn}:"  # e.g. B19: for 19200; see nn table in notes
  params:
    - name: nn
      type: string
      description: Baud code - 11=115200, 57=57600, 38=38400, 19=19200, 96=9600

- id: firmware_upgrade_initiate
  label: Initiate Firmware Upgrade
  kind: action
  command: "DWN:"
  params: []

- id: front_panel_status
  label: Front Panel & Unit Status
  kind: query
  command: "FPS:"
  params: []
  # Response: -FPS:aa_bb_cc_dd_ee_ff_gg_hh_ji_lk (aa/bb input source, cc sync mode, dd serial flag, ee frequency, ff/gg/hh source + monitor attenuation + DIP switch, ji/jk/lk mix matrix)

- id: input_gain
  label: Set Input Gain
  kind: action
  command: "IG{channel}:{nn}"
  params:
    - name: channel
      type: integer
      description: Input channel (1..4 - per source, channel designation)
    - name: nn
      type: string
      description: Hex gain 0x00 (mute) .. 0xFE (0dBFS)

- id: monitor_attenuation
  label: Attenuate Monitor by 12dB
  kind: action
  command: "MAT:{nn}"
  params:
    - name: nn
      type: string
      description: "00 = no attenuation, 01 = 12 dB attenuation"

- id: mix_matrix_set
  label: Set Mix Matrix
  kind: action
  command: "MMS:{n},{m}"
  params:
    - name: n
      type: string
      description: Output channel (1..4)
    - name: m
      type: string
      description: Hex bitwise sum of inputs to route - INPUT1=0x1, INPUT2=0x2, INPUT3=0x4, INPUT4=0x8

- id: sync_mode
  label: Sync Mode Selection
  kind: action
  command: "MOD:{nn}"
  params:
    - name: nn
      type: string
      description: "00=Master, 01=Auto, 02=Auto Lock, 03=Slave"

- id: monitor_channel_select
  label: Select Monitor Channel
  kind: action
  command: "MON:{nn}"
  params:
    - name: nn
      type: string
      description: "00=Output1, 01=Output2, 02=Output3, 03=Output4"

- id: mono_stereo_mode
  label: Mono or Stereo Selection
  kind: action
  command: "MOS:{nn}"
  params:
    - name: nn
      type: string
      description: "00=Mono, 01=Stereo"

- id: output_gain
  label: Set Output Gain
  kind: action
  command: "OG{channel}:{nn}"
  params:
    - name: channel
      type: integer
      description: Output channel (1..4 per source)
    - name: nn
      type: string
      description: Hex gain - 0x00=0dBFS, 0x01=3dBFS, 0x02=6dBFS, 0x03=12dBFS

- id: output_sample_rate
  label: Output Sample Rate Selection
  kind: action
  command: "FRQ:{nn}"
  params:
    - name: nn
      type: string
      description: "00=32k, 01=44.1k, 02=48k, 03=88.2k, 04=96k, 05=176.4k, 06=192k"

- id: source_select
  label: Source Select
  kind: action
  command: "SS{input}:{nn}"
  params:
    - name: input
      type: integer
      description: Input being changed (1 or 2)
    - name: nn
      type: string
      description: "00=AES/EBU, 01=S/PDIF, 02=Optical"

- id: status_request
  label: Status Request
  kind: query
  command: "SRQ:"
  params: []
  # Response: -SRQ:aa_bb_cc_dd_ee_ff_gg_hi_jj_kkkk (input lock, sync flash, per-input gain, output gain)

- id: sync_source_select
  label: Sync Source Select
  kind: action
  command: "SYS:{nn}"
  params:
    - name: nn
      type: string
      description: "00=Input1, 01=Input2, 02=AES/EBU, 03=Word Clock, 04=Video Sync Board"

- id: unit_id
  label: Unit Id Request
  kind: query
  command: "UID:"
  params: []
  # Response: -UID:RB-DSD1 (per source)

- id: version_number
  label: Version Number Request
  kind: query
  command: "VER:"
  params: []
  # Response: -VER:x.xxx,y.yyy (firmware version + front panel firmware version)
```

## Feedbacks
```yaml
# Observable states / query responses from source.
# Each field is one part of the FPS: or SRQ: response envelope.
- id: input_source_input_1_2
  type: enum
  values: [aes_ebu, spdif, toslink]
  description: "Input 1 & 2 source selection (aa in FPS response); 00=AES/EBU, 01=S/PDIF, 02=TOSLINK"

- id: input_source_input_3_4
  type: enum
  values: [aes_ebu, spdif, toslink]
  description: "Input 3 & 4 source selection (bb in FPS response)"

- id: sync_mode_fps
  type: enum
  values: [master, auto, auto_lock, slave]
  description: "Sync Mode Selection (cc in FPS response); 00=Master, 01=Auto, 02=Auto lock, 03=Slave"

- id: serial_mode_flag
  type: enum
  values: [off, on]
  description: "Serial Flag Indication (dd in FPS response); 00=Serial mode off, 01=on"

- id: output_sample_rate_freq
  type: enum
  values: [32k, "44_1k", "48k", "88_2k", "96k", "176_4k", "192k"]
  description: "Frequency (ee in FPS response); 00=32k..06=192k"

- id: input_lock_status_1
  type: enum
  values: [locked, unlocked]
  description: "Input 1 lock status (aa in SRQ response); 01=locked, 00=unlocked"

- id: input_lock_status_2
  type: enum
  values: [locked, unlocked]
  description: "Input 2 lock status (bb in SRQ response)"

- id: sync_flash
  type: enum
  values: [flashing, not_flashing]
  description: "Sync Flash (cc in SRQ response); 01=Flashing, 00=Not flashing"

- id: input_gain_input_1
  type: string
  description: "Input Gain For INPUT 1 (dd in SRQ); hex 0x00 (Mute) .. 0xFE (0dBFS)"

- id: input_gain_input_2
  type: string
  description: "Input Gain For INPUT 2 (ee in SRQ); hex 0x00..0xFE"

- id: input_gain_input_3
  type: string
  description: "Input Gain For INPUT 3 (ff in SRQ); hex 0x00..0xFE"

- id: input_gain_input_4
  type: string
  description: "Input Gain For INPUT 4 (gg in SRQ); hex 0x00..0xFE"

- id: output_gain_outputs_1_2
  type: string
  description: "Output Gain For OUTPUTS 1 and 2 summed (i in SRQ hi field); see note for hex values per input pair"

- id: output_gain_outputs_3_4
  type: string
  description: "Output Gain For OUTPUTS 3 and 4 summed (h in SRQ hi field); see note for hex values per input pair"

- id: version_firmware
  type: string
  description: "Firmware version from -VER:x.xxx,y.yyy (x.xxx component)"

- id: version_front_panel
  type: string
  description: "Front panel firmware version from -VER:x.xxx,y.yyy (y.yyy component)"
```

## Variables
```yaml
# Source has no separate "variable" registers; all settable parameters are exposed
# as parameterised actions (IG, OG, MMS, MAT, MOD, MOS, SYS, SS, FRQ).
# UNRESOLVED: section kept for schema completeness - no source-evidenced variables.
```

## Events
```yaml
# Unsolicited notifications from source: only the power-up banner.
- id: power_up_banner
  description: "On power-up the unit transmits the string `Initialising DMX4` followed by CR LF."
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not state explicit safety warnings, interlocks, or
# power-on sequencing requirements for the RB-DMX4. DIP switch 11 must be ON
# for serial control to be active (per source) - this is operational, not safety.
```

## Notes

### Source coverage gap
Source PDF refinement bundle is misnamed `sonifex_rb_ss10_unknown` but contains
protocol material for **RB-DMX4** (RS-232, source/refined chunk 1), **RB-IPE**
(TCP/UDP port 31781, Ethernet protocol commands, chunk 5), **RB-TGHD**
(RS-232 tone generator protocol, chunks 5–6), and an unrelated RB-OA3
(DIP-switch only, no machine protocol). **No RB-SS10 protocol content** is
present in the source.

This spec covers the RB-DMX4 only. Brief notes on the other devices for the
operator's awareness — do NOT drive them from this spec:

- **RB-IPE** — TCP/UDP port **31781**. Commands are case-sensitive (unlike
  RB-DMX4). Same 3-letter command structure. Optional 5-char prefix
  `NNNN#command`. Includes GPI/GPO/ADC/DAC commands, network config (UID, NET,
  NOP, SER, MAC, VER, WID), error codes `ERR:02/03/04`. Default static IP
  192.168.0.100/24, gateway 192.168.0.1; DHCP-on-fallback after 45s.
- **RB-TGHD** — RS-232, baud/data/parity not stated in source for TGHD
  (defaults not in refined extract). Commands not case-sensitive. Includes
  SCH (set channels), SSL/SSM/SSQ (loop/mode/sequence), SRS (sequence
  restart), SRQ (status), USQ sub-commands 0–B (user sequence programming,
  including USD/USC/USS read-back), BSV (bootloader version). Errors
  ERR:01/02/04 + 10–17 for user-sequence programming.
- **RB-SS10** — not present in this source.

### Output gain coding (per source)
For the SRQ `hi` field, gain is packed two outputs at a time:
- Inputs 1/3 (odd outputs): 0x00=0dB, 0x01=+3dB, 0x02=+6dB, 0x03=+12dB
- Inputs 2/4 (even outputs): 0x00=0dB, 0x04=+3dB, 0x08=+6dB, 0x0C=+12dB
- Example from source: inputs 1+2 at +3dB, inputs 3+4 at +12dB → h = 0x03+0x0C = 0x0F, i = 0x01+0x04 = 0x05

### Baud rate command codes (RB-DMX4, per source)
- 11 = 115200
- 57 = 57600
- 38 = 38400
- 19 = 19200 (default)
- 96 = 9600

### Error codes (RB-DMX4, per source)
- Err:01 — command not found
- Err:02 — missing parameter
- Err:04 — parameter out of range

### DIP-switch requirement
Source states: "Make sure that the RB-DMX4 is configured to operate via serial control by setting DIPSwitch 11 to ON." (Per `SCi for RB-DMX4` section.)

## Provenance

```yaml
source_domains:
  - ad56550c.delivery.rocketcdn.me
  - sonifex.co.uk
source_urls:
  - https://ad56550c.delivery.rocketcdn.me/wp-content/uploads/products/RB-SS10/redbox-06_hb.pdf
  - https://sonifex.co.uk/wp-content/uploads/products/RB-SS10/redbox-06_hb.pdf
retrieved_at: 2026-09-03T02:40:18.373Z
last_checked_at: 2026-09-21T22:17:26.052Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-21T22:17:26.052Z
matched_actions: 16
action_count: 16
confidence: medium
summary: "All 16 spec actions match RB-DMX4 wire-literal commands verbatim in source; transport params 19200/8/E/1/XON-XOFF and pin assignments present; one-to-one coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source file is named `sonifex_rb_ss10_unknown` but actually contains RB-DMX4, RB-IPE, RB-TGHD protocol material. RB-SS10 content is not present in this source. Spec covers RB-DMX4 only. RB-IPE and RB-TGHD protocol details are extracted in this spec's Source Coverage Notes."
- "section kept for schema completeness - no source-evidenced variables."
- "source does not describe multi-step macro sequences."
- "source does not state explicit safety warnings, interlocks, or"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
