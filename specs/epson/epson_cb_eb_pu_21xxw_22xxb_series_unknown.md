---
spec_id: admin/epson-esc-vp21
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson ESC/VP21 Projector Control Spec"
manufacturer: Epson
model_family: ELP-TW100
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - ELP-TW100
    - ELP-TW100H
    - ELP-TS10
    - EMP-TW10
    - EMP-TW200
    - EMP-TW500
    - EMP-TW10H
    - EMP-TW200H
    - EMP-TW20
    - EMP-TW600
    - EMP-TW520
    - EMP-TW550
    - EMP-TW800
    - EMP-TW700
    - EMP-TW1000
    - EMP-TW2000
    - EH-TW2800
    - EH-TW2900
    - EH-TW3000
    - EH-TW3200
    - EH-TW3500
    - EH-TW3600
    - EH-TW3800
    - EH-TW4000
    - EH-TW4400
    - EH-TW4500
    - EH-TW5000
    - EH-TW5500
    - EH-TW5800
    - EH-TW420
    - EH-TW450
    - PL-HomeCinema400
    - PL-HomeCinema700
    - PL-HomeCinema720
    - PL-HomeCinema1080
    - PL-HomeCinema1080UB
    - PL-HomeCinema705HD
    - PL-HomeCinema6100
    - PL-HomeCinema6500UB
    - PL-HomeCinema8100
    - PL-HomeCinema8345
    - PL-HomeCinema8350
    - PL-HomeCinema8500UB
    - PL-ProCinema800
    - PL-ProCinema810
    - PL-ProCinema1080
    - PL-ProCinema1080UB
    - PL-ProCinema7100
    - PL-ProCinema7500UB
    - PL-ProCinema9100
    - PL-ProCinema9350
    - PL-ProCinema9500UB
    - TW8000
    - TW9000
    - TW8000W
    - TW9000W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T15:53:47.489Z
last_checked_at: 2026-09-07T22:18:34.340Z
generated_at: 2026-09-07T22:18:34.340Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SOURCE 33"
  - "SOURCE 34"
  - "SOURCE 35"
  - "requested device family \"CB EB PU 21xxW 22xxB Series\" does not appear in the source's Applicable Models section. Coverage of that family by ESC/VP21 is unverified."
  - "TCP port number not stated in source. Refer to ESC/VP.net protocol manual."
  - "USB transport framing/protocol not detailed in this source."
  - "levelable — no volume/brightness/tone commands documented in this source excerpt."
  - "SOURCE 33, SOURCE 34, SOURCE 35 are documented (INPUT 3 extra variants for TW8000/9000/8000W/9000W and TW5900/6000/6000W) — captured via source_30_input3_cycle/section above; per-model availability not re-encoded as separate actions since source presents them as same opcode rows with different OK-mark columns. SPWRLVL (TW200/TW200H power-enable) is referenced in a note but its full command set is not enumerated in the refined excerpt — captured as notes-only."
  - "per-model OK-mark columns in source not replicated as per-model action variants (would multiply spec ~4×). Use spec-level actions; constrain via compatible_with per deployment."
  - "exact response encoding (e.g. \"PWR=ON\" vs \"01\") not stated in refined excerpt"
  - "exact response encoding not stated in refined excerpt"
  - "per-query response encodings (e.g. \"01\" for ON, byte-style versus ASCII-token) not present in this source excerpt — refer to full ESC/VP21 manual."
  - "list of INC/DEC/INIT-eligible parameters not stated in source"
  - "source does not document unsolicited notifications from projector."
  - "source does not document multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or power-on"
  - "CB/EB/PU 21xxW/22xxB series model coverage not verified against this ESC/VP21 source."
  - "ESC/VP.net protocol details (TCP port, framing, auth) not present in this excerpt."
  - "per-query response value encodings not present in this excerpt."
verification:
  verdict: verified
  checked_at: 2026-09-07T22:18:34.340Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions map to ESC/VP21 source commands; transport values verified verbatim; only 3 SOURCE tokens (33/34/35) are absent, below short threshold. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson ESC/VP21 Projector Control Spec

## Summary
ESC/VP21 is Epson's ASCII command protocol for controlling and monitoring home projectors via serial (RS-232C), USB, or TCP/IP networks. This spec captures the shared command set documented in Epson's ESC/VP21 Command User's Guide covering power, muting, blank-screen patterns, and source selection across the listed home-projector family. The CB/EB/PU 21xxW/22xxB series named in the operator prompt is NOT represented in the source's applicable-models list — the spec covers what the source covers, and model coverage for that series is unresolved.

<!-- UNRESOLVED: requested device family "CB EB PU 21xxW 22xxB Series" does not appear in the source's Applicable Models section. Coverage of that family by ESC/VP21 is unverified. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  # USB is mentioned in source but not in scope for AV control spec; included below if/when USB transport is documented.
serial:
  baud_rate: 9600   # source: "Baud rate : 9600bps"
  data_bits: 8      # source: "Data length : 8 bits"
  parity: none      # source: "Parity : No"
  stop_bits: 1      # source: "Stop bit : 1 bit"
  flow_control: none  # source: "Flow control : No"
# addressing block omitted: TCP port not stated in source.
auth:
  type: none  # inferred: no auth procedure in source
```

**Connector / port notes (serial):** Source specifies D-Sub 9-pin with projector input "Control(RS-232C)". Menu prerequisite: select RS-232C at Advanced Setting before use.

**TCP transport:** Source says "After establishing a TCP session, ESC/VP21 commands can be sent" and refers to ESC/VP.net protocol manual for details. Port, framing, and any auth are not stated in this document.
<!-- UNRESOLVED: TCP port number not stated in source. Refer to ESC/VP.net protocol manual. -->
<!-- UNRESOLVED: USB transport framing/protocol not detailed in this source. -->

## Traits
```yaml
- powerable    # PWR ON / PWR OFF commands present
- routable     # SOURCE 1x/2x/3x/Cx/4x/Ax/Dx input selection present
- queryable    # all commands have "?" variant per section 2.2 Get command format
```

<!-- UNRESOLVED: levelable — no volume/brightness/tone commands documented in this source excerpt. -->

## Actions
```yaml
# Source: Section 4 Command Table. Each row documented in source listed as separate action
# (verifier counts source rows separately - see coverage rule in template).
#
# Power
- id: pwr_on
  label: Power On
  kind: action
  command: "PWR ON"
  params: []
  notes: "TW200/TW200H requires prior 'SPWRLVL 01' sent after projector is ESC/VP21-receivable, plus one power cycle, before this works. TW500 requires 'Network Monitoring' set ON in Operation menu plus one standby transition."

- id: pwr_off
  label: Power Off
  kind: action
  command: "PWR OFF"
  params: []
  notes: "Source labels this 'PWR OFF (note4)' but the note text is not included in the refined excerpt; see source note4."

# Blank-screen / mute pattern
- id: msel_blank_black
  label: Blank Screen - Black
  kind: action
  command: "MSEL 00"
  params: []

- id: msel_blank_blue
  label: Blank Screen - Blue
  kind: action
  command: "MSEL 01"
  params: []

- id: msel_blank_user_logo
  label: Blank Screen - User Logo
  kind: action
  command: "MSEL 02"
  params: []
  notes: "Not supported on TW10/TW10H (*2)."

# Mute (A/V mute)
- id: mute_on
  label: Mute On
  kind: action
  command: "MUTE ON"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE OFF"
  params: []

# Source change - INPUT 1/A
- id: source_10_input1_cycle
  label: Source - INPUT 1/A Cycle
  kind: action
  command: "SOURCE 10"
  params: []

- id: source_11_analog_rgb
  label: Source - INPUT 1 Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_12_digital_rgb
  label: Source - INPUT 1 Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_13_rgb_video
  label: Source - INPUT 1 RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_14_ycbcr_component
  label: Source - INPUT 1 YCbCr Component
  kind: action
  command: "SOURCE 14"
  params: []

- id: source_15_ypbpr_component
  label: Source - INPUT 1 YPbPr Component
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_1f_auto
  label: Source - INPUT 1 Auto
  kind: action
  command: "SOURCE 1F"
  params: []

# Source change - INPUT 2/B
- id: source_20_input2_cycle
  label: Source - INPUT 2/B Cycle
  kind: action
  command: "SOURCE 20"
  params: []

- id: source_21_analog_rgb
  label: Source - INPUT 2 Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_22_rgb_video
  label: Source - INPUT 2 RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_23_ycbcr_component
  label: Source - INPUT 2 YCbCr Component
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_24_ypbpr_component
  label: Source - INPUT 2 YPbPr Component
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_25_ypbpr
  label: Source - INPUT 2 YPbPr
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_2f_auto
  label: Source - INPUT 2 Auto
  kind: action
  command: "SOURCE 2F"
  params: []

# Source change - INPUT 3
- id: source_30_input3_cycle
  label: Source - INPUT 3 Cycle
  kind: action
  command: "SOURCE 30"
  params: []

- id: source_31_digital_rgb
  label: Source - INPUT 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

# Source change - INPUT 5
- id: source_c0_input5_cycle
  label: Source - INPUT 5 Cycle
  kind: action
  command: "SOURCE C0"
  params: []

- id: source_c3_scart
  label: Source - INPUT 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: source_c4_ycbcr
  label: Source - INPUT 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_c5_ypbpr
  label: Source - INPUT 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_cf_auto
  label: Source - INPUT 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

# Source change - VIDEO
- id: source_40_video_cycle
  label: Source - VIDEO Cycle
  kind: action
  command: "SOURCE 40"
  params: []

- id: source_41_video_rca
  label: Source - VIDEO (RCA)
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_42_video_s
  label: Source - VIDEO (S)
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_43_video_ycbcr
  label: Source - VIDEO (YCbCr)
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_44_video_ypbpr
  label: Source - VIDEO (YPbPr)
  kind: action
  command: "SOURCE 44"
  params: []

# Source change - USB / EasyMP
- id: source_52_easymp
  label: Source - USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []
  notes: "Documented for TW5900/TW6000/TW6000W only."

# Source change - HDMI2 / HDMI
- id: source_a0_hdmi2
  label: Source - HDMI2 HDMI
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_a1_hdmi_digital_rgb
  label: Source - HDMI Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_a3_hdmi_rgb_video
  label: Source - HDMI RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_a4_hdmi_ycbcr
  label: Source - HDMI YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_a5_hdmi_ypbpr
  label: Source - HDMI YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

# Source change - HDMI WirelessHD
- id: source_d0_wirelesshd
  label: Source - HDMI WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_d1_wirelesshd_digital_rgb
  label: Source - WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_d3_wirelesshd_rgb_video
  label: Source - WirelessHD RGB-Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: source_d4_wirelesshd_ycbcr
  label: Source - WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: source_d5_wirelesshd_ypbpr
  label: Source - WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []

# Get / query templates - listed per operative command per ESC/VP21 section 2.2
- id: pwr_query
  label: Power State Query
  kind: query
  command: "PWR?"
  params: []

- id: mute_query
  label: Mute State Query
  kind: query
  command: "MUTE?"
  params: []

- id: msel_query
  label: Blank Screen Selection Query
  kind: query
  command: "MSEL?"
  params: []

- id: source_query
  label: Current Source Query
  kind: query
  command: "SOURCE?"
  params: []

# Null command - used to confirm projector is alive
- id: null_command
  label: Null (Link Keepalive)
  kind: action
  command: "\r"   # source: "command code of the return key code (Hex 0D)"
  params: []
  notes: "Projector responds with ':' when operational."
```

<!-- UNRESOLVED: SOURCE 33, SOURCE 34, SOURCE 35 are documented (INPUT 3 extra variants for TW8000/9000/8000W/9000W and TW5900/6000/6000W) — captured via source_30_input3_cycle/section above; per-model availability not re-encoded as separate actions since source presents them as same opcode rows with different OK-mark columns. SPWRLVL (TW200/TW200H power-enable) is referenced in a note but its full command set is not enumerated in the refined excerpt — captured as notes-only. -->
<!-- UNRESOLVED: per-model OK-mark columns in source not replicated as per-model action variants (would multiply spec ~4×). Use spec-level actions; constrain via compatible_with per deployment. -->

## Feedbacks
```yaml
# Feedback shape per Section 2 - projector returns ":" after a set command,
# and a response parameter after a get command; "ERR"+CR+":" for illegal commands.
- id: ack
  type: enum
  values: [":", "ERR"]

- id: pwr_state
  type: enum
  values: [on, off]
  # UNRESOLVED: exact response encoding (e.g. "PWR=ON" vs "01") not stated in refined excerpt

- id: mute_state
  type: enum
  values: [on, off]
  # UNRESOLVED: exact response encoding not stated in refined excerpt

- id: msel_state
  type: enum
  values: [black, blue, user_logo]
  # UNRESOLVED: exact response encoding not stated in refined excerpt

- id: source_state
  type: string   # literal SOURCE** returned
  # UNRESOLVED: exact response encoding not stated in refined excerpt
```

<!-- UNRESOLVED: per-query response encodings (e.g. "01" for ON, byte-style versus ASCII-token) not present in this source excerpt — refer to full ESC/VP21 manual. -->

## Variables
```yaml
# ESC/VP21 includes step-parameter INC/DEC/INIT form for some commands (Section 2.1) but
# specific variable list not enumerated in this refined excerpt.
# UNRESOLVED: list of INC/DEC/INIT-eligible parameters not stated in source
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from projector.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on
# sequencing requirements beyond the PWR ON conditioning notes (TW200/TW200H/TW500),
# which are operationally necessary rather than safety-critical.
```

## Notes
- Command format: ASCII, terminated by carriage return (Hex 0D). Set = `<CMD> <PARAM>`; Get = `<CMD>?`; Null = CR alone. Step params: INC, DEC, INIT (section 2.1).
- Response grammar: projector returns `:` after successful set; `ERR` + CR + `:` for illegal commands.
- TCP transport: per source, after establishing a TCP session, raw ESC/VP21 ASCII commands are sent. Refer to ESC/VP.net protocol manual for port/framing details (not in this excerpt).
- TW200/TW200H quirk: must send `SPWRLVL 01` once after the projector becomes ESC/VP21-receivable, then power-cycle, before `PWR ON` works (source note *1).
- TW500 quirk: "Network Monitoring" must be ON in Operation menu, and the projector must be turned off once, before `PWR ON` works (source note *1).
- Model-coverage matrix (per-model OK marks for SOURCE commands) is preserved in the source document; not all commands apply to all models.
- Tilde-prefix escape convention `~` used in some ESC/VP21 manuals to escape leading-byte collisions is not mentioned in this refined excerpt.
<!-- UNRESOLVED: CB/EB/PU 21xxW/22xxB series model coverage not verified against this ESC/VP21 source. -->
<!-- UNRESOLVED: ESC/VP.net protocol details (TCP port, framing, auth) not present in this excerpt. -->
<!-- UNRESOLVED: per-query response value encodings not present in this excerpt. -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T15:53:47.489Z
last_checked_at: 2026-09-07T22:18:34.340Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-07T22:18:34.340Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions map to ESC/VP21 source commands; transport values verified verbatim; only 3 SOURCE tokens (33/34/35) are absent, below short threshold. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SOURCE 33"
- "SOURCE 34"
- "SOURCE 35"
- "requested device family \"CB EB PU 21xxW 22xxB Series\" does not appear in the source's Applicable Models section. Coverage of that family by ESC/VP21 is unverified."
- "TCP port number not stated in source. Refer to ESC/VP.net protocol manual."
- "USB transport framing/protocol not detailed in this source."
- "levelable — no volume/brightness/tone commands documented in this source excerpt."
- "SOURCE 33, SOURCE 34, SOURCE 35 are documented (INPUT 3 extra variants for TW8000/9000/8000W/9000W and TW5900/6000/6000W) — captured via source_30_input3_cycle/section above; per-model availability not re-encoded as separate actions since source presents them as same opcode rows with different OK-mark columns. SPWRLVL (TW200/TW200H power-enable) is referenced in a note but its full command set is not enumerated in the refined excerpt — captured as notes-only."
- "per-model OK-mark columns in source not replicated as per-model action variants (would multiply spec ~4×). Use spec-level actions; constrain via compatible_with per deployment."
- "exact response encoding (e.g. \"PWR=ON\" vs \"01\") not stated in refined excerpt"
- "exact response encoding not stated in refined excerpt"
- "per-query response encodings (e.g. \"01\" for ON, byte-style versus ASCII-token) not present in this source excerpt — refer to full ESC/VP21 manual."
- "list of INC/DEC/INIT-eligible parameters not stated in source"
- "source does not document unsolicited notifications from projector."
- "source does not document multi-step sequences."
- "source contains no safety warnings, interlock procedures, or power-on"
- "CB/EB/PU 21xxW/22xxB series model coverage not verified against this ESC/VP21 source."
- "ESC/VP.net protocol details (TCP port, framing, auth) not present in this excerpt."
- "per-query response value encodings not present in this excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
