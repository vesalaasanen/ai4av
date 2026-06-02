---
spec_id: admin/allen-heath-qu
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath QU Control Spec"
manufacturer: "Allen & Heath"
model_family: Qu-16
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - Qu-16
    - Qu-24
    - Qu-32
    - Qu-Pac
    - Qu-SB
  firmware: V1.9+
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2023/06/Qu_MIDI_Protocol_V1.9.pdf
retrieved_at: 2026-04-30T04:34:27.258Z
last_checked_at: 2026-06-02T21:39:38.109Z
generated_at: 2026-06-02T21:39:38.109Z
firmware_coverage: V1.9+
protocol_coverage: []
known_gaps:
  - "USB serial config (baud rate) not stated — USB is class-compliant, no driver required for Mac"
  - "no explicit multi-step macros described in source"
  - "no explicit interlock or sequencing procedures in source"
  - "USB baud rate not stated (USB is class-compliant, operates at device-level speed)"
  - "TCP/IP address configuration not described in source"
  - "firmware version compatibility beyond V1.9 not stated"
  - "binary encoding of all NRPN parameter values — only hex ranges provided, not full enumeration"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:39:38.109Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 MIDI-based control actions found in source NRPN/SYSEX documentation with matching channel indices, parameter ranges, and hex codes. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Allen & Heath QU Control Spec

## Summary
Allen & Heath QU series digital mixers (Qu-16, Qu-24, Qu-32, Qu-Pac, Qu-SB) running firmware V1.9+. Control via MIDI over USB-B and TCP/IP (port 51325). Supports fader/pan/routing, processing (EQ, gate, compressor, delay), scene recall, meter feedback, and remote shutdown.

<!-- UNRESOLVED: USB serial config (baud rate) not stated — USB is class-compliant, no driver required for Mac -->

## Transport
```yaml
protocols:
  - tcp
  - usb  # MIDI over USB-B, class compliant
addressing:
  port: 51325  # TCP MIDI port stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # Remote Shutdown command present
- routable        # Input/output routing, mix assign, DCA groups
- queryable       # Scene recall, system state, meter data via SysEx
- levelable       # Faders, send levels, gain, trim
```

## Actions
```yaml
- id: mute
  label: Mute
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0-based hex offset)
    - name: mute_on
      type: boolean
      description: true = mute on (velocity >= 0x40), false = mute off (velocity < 0x40)

- id: fader
  label: Fader
  kind: action
  params:
    - name: channel
      type: integer
    - name: position
      type: integer
      description: 0x00 to 0x7F (inf to +10dB, 0dB = 0x62)

- id: pan
  label: Pan
  kind: action
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
      description: 0x00 (Full Left) to 0x4A (Full Right), centre = 0x25
    - name: mix_index
      type: integer
      description: VX value for target mix (0x04-0x07 = Mix 5-6 to LR, 0x08-0x0B = Grp, 0x0C-0x0D = MTX)

- id: lr_assign
  label: LR Assign
  kind: action
  params:
    - name: channel
      type: integer
    - name: on
      type: boolean
      description: 0x00 = off, 0x01 = on

- id: mix_assign
  label: Mix Assign
  kind: action
  params:
    - name: channel
      type: integer
    - name: mix_index
      type: integer
      description: 0x00-0x0B = Mix 1-9/10 + LR, 0x10-0x13 = FX send 1-4
    - name: on
      type: boolean

- id: mute_group_assign
  label: Mute Group Assign
  kind: action
  params:
    - name: channel
      type: integer
    - name: group
      type: integer
      description: Group 1-4 = index 0-3
    - name: on
      type: boolean

- id: dca_group_assign
  label: DCA Group Assign
  kind: action
  params:
    - name: channel
      type: integer
    - name: group
      type: integer
      description: Group 1-4 = index 0-3
    - name: on
      type: boolean

- id: mix_pre_post
  label: Mix Pre/Post
  kind: action
  params:
    - name: channel
      type: integer
    - name: mix_index
      type: integer
    - name: pre
      type: boolean
      description: 0x00 = Post, 0x01 = Pre

- id: send_level
  label: Send Level
  kind: action
  params:
    - name: channel
      type: integer
    - name: send_index
      type: integer
      description: VX value (0x00-0x06 = Mix, 0x08-0x0B = Grp, 0x10-0x13 = FX, 0x0C-0x0D = MTX)
    - name: level
      type: integer
      description: 0x00 to 0x7F (-inf to +10dB)

- id: pafl_select
  label: PAFL Select
  kind: action
  params:
    - name: channel
      type: integer
    - name: on
      type: boolean

- id: ch_usb_source
  label: Channel USB Source
  kind: action
  params:
    - name: channel
      type: integer
    - name: on
      type: boolean
      description: false = Preamp, true = USB

- id: ch_preamp_source
  label: Channel Preamp Source
  kind: action
  params:
    - name: channel
      type: integer
    - name: on
      type: boolean
      description: false = Local, true = dSNAKE

- id: dsnake_patch
  label: dSNAKE Patch
  kind: action
  params:
    - name: channel
      type: integer
    - name: socket_index
      type: integer
      description: 0x00 to 0x27
  note: unidirectional - sent from mixer, not received

- id: local_preamp_gain
  label: Local Preamp Gain
  kind: action
  params:
    - name: channel
      type: integer
    - name: gain
      type: integer
      description: -5dB to +60dB = 0x00 to 0x7F

- id: digital_trim
  label: Digital Trim
  kind: action
  params:
    - name: channel
      type: integer
    - name: trim
      type: integer
      description: -24 to +24dB = 0x00 to 0x7F, 0dB = 0x40

- id: stereo_trim
  label: Stereo Trim
  kind: action
  params:
    - name: channel
      type: integer
      description: Applies to local ST1, ST2, ST3 inputs only
    - name: trim
      type: integer
      description: -24 to +24dB = 0x00 to 0x7F, 0dB = 0x40

- id: polarity
  label: Polarity
  kind: action
  params:
    - name: channel
      type: integer
    - name: reversed
      type: boolean
      description: false = normal, true = reversed

- id: insert_in_out
  label: Insert In/Out
  kind: action
  params:
    - name: channel
      type: integer
    - name: in
      type: boolean
      description: false = Out, true = In

- id: peq
  label: PEQ Parameter
  kind: action
  params:
    - name: channel
      type: integer
    - name: param_id
      type: integer
      description: |
        0x01=LF Gain, 0x02=LF Freq, 0x03=LF Width, 0x04=LF Type,
        0x05=LM Gain, 0x06=LM Freq, 0x07=LM Width,
        0x09=HM Gain, 0x0A=HM Freq, 0x0B=HM Width,
        0x0D=HF Gain, 0x0E=HF Freq, 0x0F=HF Width, 0x10=HF Type
    - name: value
      type: integer
      description: Depends on parameter (gain = -12 to +12dB = 0x00-0x7F, 0dB=0x40; freq = 20Hz-20kHz; width = 1.5 to 1/9 Oct; type = Bell=0x00, Shelf=0x06)

- id: peq_in_out
  label: PEQ In/Out
  kind: action
  params:
    - name: channel
      type: integer
    - name: in
      type: boolean
      description: false = Out, true = In

- id: hpf_freq
  label: HPF Frequency
  kind: action
  params:
    - name: channel
      type: integer
    - name: freq
      type: integer
      description: 20Hz to 20kHz = 0x00 to 0x7F

- id: hpf_in_out
  label: HPF In/Out
  kind: action
  params:
    - name: channel
      type: integer
    - name: in
      type: boolean
      description: false = Out, true = In

- id: geq_gain
  label: GEQ Gain
  kind: action
  params:
    - name: channel
      type: integer
    - name: band
      type: integer
      description: 0x00 to 0x1B (28 bands)
    - name: gain
      type: integer
      description: -12 to +12dB = 0x00 to 0x7F

- id: geq_in_out
  label: GEQ In/Out
  kind: action
  params:
    - name: channel
      type: integer
    - name: in
      type: boolean
      description: false = Out, true = In

- id: gate
  label: Gate Parameter
  kind: action
  params:
    - name: channel
      type: integer
    - name: param_id
      type: integer
      description: 0x41=Attack, 0x42=Release, 0x43=Hold, 0x44=Threshold, 0x45=Depth
    - name: value
      type: integer
      description: Attack=50us-300ms, Release=10ms-1s, Hold=10ms-5s, Threshold=-72 to +18dB, Depth=0-60dB

- id: gate_in_out
  label: Gate In/Out
  kind: action
  params:
    - name: channel
      type: integer
    - name: in
      type: boolean
      description: false = Out, true = In

- id: compressor
  label: Compressor Parameter
  kind: action
  params:
    - name: channel
      type: integer
    - name: param_id
      type: integer
      description: 0x61=Type, 0x62=Attack, 0x63=Release, 0x64=Knee, 0x65=Ratio, 0x66=Threshold, 0x67=Gain
    - name: value
      type: integer
      description: Type=0x00-0x03, Attack=300us-300ms, Release=100ms-2s, Knee=Hard/Soft, Ratio=1:1-inf, Threshold=-46 to +18dB, Gain=0-18dB

- id: comp_in_out
  label: Compressor In/Out
  kind: action
  params:
    - name: channel
      type: integer
    - name: in
      type: boolean
      description: false = Out, true = In

- id: delay_time
  label: Delay Time
  kind: action
  params:
    - name: channel
      type: integer
    - name: time
      type: integer
      description: |
        0x00 to 0x40 for Input (0-85ms linear);
        0x00 to 0x7F for Mix/Group/Matrix (0-170ms linear)
    - name: delay_type
      type: integer
      description: 0x07 = standard, 0x05 = Left tap, 0x07 = Right tap (for FX)

- id: delay_in_out
  label: Delay In/Out
  kind: action
  params:
    - name: channel
      type: integer
    - name: in
      type: boolean
      description: false = Out, true = In

- id: remote_shutdown
  label: Remote Shutdown
  kind: action
  params: []
  note: Requires hard power reset to switch on mixer after shutdown

- id: fx_delay_time
  label: FX Delay Time (Tap Tempo)
  kind: action
  params:
    - name: fx_channel
      type: integer
    - name: fine_value
      type: integer
      description: LSB fine resolution 0x00-0x7F
    - name: coarse_value
      type: integer
      description: MSB coarse resolution 0x00-0x7F
    - name: tap
      type: integer
      description: 0x05=Left tap, 0x07=Right tap

- id: fx_delay_link
  label: FX Delay Link
  kind: action
  params:
    - name: fx_channel
      type: integer
    - name: linked
      type: boolean
      description: false=unlinked, true=linked

- id: scene_recall
  label: Scene Recall
  kind: action
  params:
    - name: scene
      type: integer
      description: Scene 1-100 = 0x00 to 0x63

- id: set_bank_1
  label: Set Bank 1 (for Scene Recall)
  kind: action
  params: []
  note: Qu ignores scene change messages if Bank is not set to 1

- id: channel_name_get
  label: Get Channel Name
  kind: query
  params:
    - name: channel
      type: integer

- id: channel_name_set
  label: Set Channel Name
  kind: action
  params:
    - name: channel
      type: integer
    - name: name
      type: string
      description: Hex ASCII string

- id: mmc_transport
  label: MMC Transport Control
  kind: action
  params:
    - name: command
      type: integer
      description: 0x01=Stop, 0x02=Play, 0x04=FastForward, 0x05=Rewind, 0x06=RecordStrobe, 0x09=Pause

- id: strip_fader
  label: Strip Fader (DAW)
  kind: action
  params:
    - name: strip
      type: integer
      description: Strip 1-32 = 0x00 to 0x1F (uses MIDI channel N+1)
    - name: position
      type: integer
      description: 0x00 to 0x7F

- id: strip_key
  label: Strip Key (DAW)
  kind: action
  params:
    - name: key_type
      type: integer
      description: 0x00-0x1F=Mute, 0x20-0x3F=Sel, 0x40-0x5F=PAFL
    - name: strip
      type: integer
      description: Strip 1-32 = 0x00 to 0x1F
    - name: on
      type: boolean

- id: daw_bank_up
  label: DAW Bank Up
  kind: action
  params: []

- id: daw_bank_down
  label: DAW Bank Down
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: active_sense
  type: binary
  description: Byte 0xFE sent every ~300ms over TCP/IP. Connection closes after 12s inactivity.

- id: meter_data
  type: binary
  description: |
    Sysex meter push (0xF0, 0x00, 0x00, 0x1A, 0x50, 0x11, 0x01, 0x00, {CH}, 0x13, {MeterData}, 0xF7).
    Meter values = signed dB, 7Q8 fixed point format (see source for 7-bit-ized encoding details).

- id: scene_recall_transmit
  type: integer
  description: Qu transmits when scene recalled - B N, 0x00, 0x00, B N, 0x20, 0x00, C N, SS (SS = 0x00-0x63)

- id: system_state
  type: binary
  description: |
    Sysex reply to All Call request: 0xF0, 0x00, 0x00, 0x1A, 0x50, 0x11, 0x01, 0x00, 0x7F, 0x10, {iPadFlag}, 0xF7
    Returns BoxID (1=Qu-16, 2=Qu-24, 3=Qu-32, 4=Qu-PAC, 5=Qu-SB) and firmware version.

- id: channel_name_reply
  type: string
  description: Sysex reply with channel name as hex ASCII string

- id: meter_data_reply
  type: binary
  description: Sysex reply 0x13 followed by meter data block (format varies by mixer model - see source tables)

- id: end_sync
  type: binary
  description: Sysex 0x14, 0xF7 - sent after system state sync completes
```

## Variables
```yaml
# NRPN parameters exposed as queryable variables (read/write via NRPN):
- id: group_mode
  type: enum
  values: [group, mix]
  description: 0x00 = Group mode, 0x01 = Mix mode

- id: fader_position
  type: integer
  description: 0x00-0x7F (-inf to +10dB, 0dB = 0x62)

- id: pan_position
  type: integer
  description: 0x00 (Full Left) to 0x4A (Full Right), centre = 0x25

- id: mute_state
  type: boolean
  description: Current mute state for channel

- id: meter_levels
  type: binary
  description: Per-channel meter data in 7Q8 dB format
```

## Events
```yaml
# Qu sends unsolicited:
- id: meter_push
  description: Periodic meter data pushed via Sysex (format per model - see source reference tables)
- id: scene_recalled
  description: Qu broadcasts scene recall message when user triggers via touchscreen or SoftKey
- id: active_sense_pulse
  description: 0xFE sent every ~300ms during connection inactivity
- id: connection_timeout
  description: Ethernet connection closed after 12s without data
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for:
  - remote_shutdown  # Mixer requires hard power reset to switch back on
interlocks: []
# UNRESOLVED: no explicit interlock or sequencing procedures in source
```

## Notes
- TCP MIDI port 51325 stated; only one TCP MIDI connection allowed at a time
- USB MIDI is class-compliant — no driver needed for Mac, driver available from allen-heath.com for Windows
- NRPN format: B N, 0x63, CH, B N, 0x62, ID, B N, 0x06, VA, B N, 0x26, VX
- DAW strip messages use MIDI channel N+1 (separate from Qu functions on channel N)
- Meter data encoding uses 7-bit-ized format — every 7 bytes → 8 bytes in MIDI stream (see source for algorithm)
- Scene recall via Bank Select + Program Change — Bank 1 required
- Remote Shutdown: after sending shutdown command, mixer requires hard power reset to power back on

<!-- UNRESOLVED: USB baud rate not stated (USB is class-compliant, operates at device-level speed) -->
<!-- UNRESOLVED: TCP/IP address configuration not described in source -->
<!-- UNRESOLVED: firmware version compatibility beyond V1.9 not stated -->
<!-- UNRESOLVED: binary encoding of all NRPN parameter values — only hex ranges provided, not full enumeration -->

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2023/06/Qu_MIDI_Protocol_V1.9.pdf
retrieved_at: 2026-04-30T04:34:27.258Z
last_checked_at: 2026-06-02T21:39:38.109Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:39:38.109Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 MIDI-based control actions found in source NRPN/SYSEX documentation with matching channel indices, parameter ranges, and hex codes. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB serial config (baud rate) not stated — USB is class-compliant, no driver required for Mac"
- "no explicit multi-step macros described in source"
- "no explicit interlock or sequencing procedures in source"
- "USB baud rate not stated (USB is class-compliant, operates at device-level speed)"
- "TCP/IP address configuration not described in source"
- "firmware version compatibility beyond V1.9 not stated"
- "binary encoding of all NRPN parameter values — only hex ranges provided, not full enumeration"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
