---
spec_id: admin/dhd-rm420-027
schema_version: ai4av-public-spec-v1
revision: 1
title: "DHD RM420-027 (External Control Protocol) Control Spec"
manufacturer: DHD
model_family: RM420-027
aliases: []
compatible_with:
  manufacturers:
    - DHD
  models:
    - RM420-027
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developer.dhd.audio
source_urls:
  - https://developer.dhd.audio/docs/API/ECP/
  - https://developer.dhd.audio/docs/API/ECP/commands
  - https://developer.dhd.audio/docs/API/ECP/communication
  - https://developer.dhd.audio/
retrieved_at: 2026-08-18T00:04:37.967Z
last_checked_at: 2026-08-19T09:18:57.686Z
generated_at: 2026-08-19T09:18:57.686Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source states ECP availability per firmware version but does not state firmware version of this RM420-027 device itself."
  - "source notes arbitration ownership not enforced by firmware (\"routings are always possible even if an Device ID is set\"); IO Gain changes \"valid until restart\" - these are advisory, not safety interlock procedures."
  - "firmware version of the RM420-027 instance; electrical specs of RS-232/RS-422 interfaces (per source, see module documentation)."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:18:57.686Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions map to verbatim source commands with matching ID, length, and parameter shape; transport is verbatim. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# DHD RM420-027 (External Control Protocol) Control Spec

## Summary
DHD RM420-027 documents the External Control Protocol (ECP) used to control DHD DSP frames (RM4200D, 52/XR, 52/XS/XC/XD series) via RS-232, RS-422, or TCP/IP. Each frame carries a 16-byte block containing a 29-bit command ID (low 20 bits per command, high 4 bits zero-padded) and up to 8 data bytes; response is via separate block. ECP is deprecated as of firmware 10.2 for new 3rd-gen core integrations (XC3/XD3/XS3) — Control API preferred for new projects.

<!-- UNRESOLVED: source states ECP availability per firmware version but does not state firmware version of this RM420-027 device itself. -->

## Transport
```yaml
# ECP runs on either serial (RS-232/RS-422) or TCP. Per source both listed.
protocols:
  - tcp
  - serial
addressing:
  port: 2008 # stated verbatim: "TCP Connection, IP Address, Port 2008"
serial:
  baud_rate: 38400  # stated verbatim: "38400, 8, N, 1 no protocol"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # stated: "no protocol" interpreted as no hardware-flow handshake
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable        # inferred from routing command examples (0x01F5xxxx)
- levelable       # inferred from fader/gain/level command examples
- queryable       # inferred from request/notification variants
```

## Actions
```yaml
# Block frame: 16-byte packet. Bytes 0..3 carry0,0,0,Length(0..8). Bytes 4..7 carry ID28..ID0.
# Bytes 8..15 carry D0..D7. Bytes 16..18 reserved (U0,U1,U2) and zero on send.
# Below uses compact text form `ID,Length,D0..Dn` for readability; build16-byte MSB-first blocks on send.

- id: set_output_routing_16bit_request_all
  label: Set Output Routing (16-bit) - Request All Crosspoints
  kind: query
  command: "01F50000,0"
  params: []

- id: set_output_routing_16bit_request_one
  label: Set Output Routing (16-bit) - Request One Crosspoint
  kind: query
  command: "01F50000,2,OutputHi,OutputLo"
  params:
    - name: OutputHi
      type: byte
      description: Slot number hi-byte (0x00..0x1E)
    - name: OutputLo
      type: byte
      description: Output number within slot (bit 7 = 0x80 marks outputs)

- id: set_output_routing_16bit_set
  label: Set Output Routing (16-bit) - Set Crosspoint
  kind: action
  command: "01F50000,4,OutputHi,OutputLo,InputHi,InputLo"
  params:
    - name: OutputHi
      type: byte
      description: Output slot hi    - name: OutputLo
      type: byte
      description: Output number within slot
    - name: InputHi
      type: byte
      description: Input slot hi or0x40..0x7F for summation/special
    - name: InputLo
      type: byte
      description: Input number,0xFFFF = Mute

- id: set_output_routing_32bit_notify_off
  label: Set Output Routing (32-bit) - Deactivate Crosspoint Notification
  kind: action
  command: "01F50000,1,0x00"
  params: []

- id: set_output_routing_32bit_notify_on
  label: Set Output Routing (32-bit) - Activate Crosspoint Notification (TCP only)
  kind: action
  command: "01F50000,1,0x01"
  params: []

- id: set_output_routing_32bit_request_one
  label: Set Output Routing (32-bit) - Request One Crosspoint
  kind: query
  command: "01F50000,5,OutputID0,OutputID1,OutputID2,OutputID3"
  params:
    - name: OutputID0..3
      type: byte
      description: 32-bit AudioID of output (MSB first)

- id: set_output_routing_32bit_set
  label: Set Output Routing (32-bit) - Set Crosspoint
  kind: action
  command: "01F50000,8,OutputID0,OutputID1,OutputID2,OutputID3,InputID0,InputID1,InputID2,InputID3"
  params:
    - name: OutputID
      type: byte
      description: 32-bit AudioID, MSB first
    - name: InputID
      type: byte
      description: 32-bit AudioID; 0x00000000 = Mute

- id: set_arbitration_request
  label: Set Arbitration - Request Owner of Audio ID
  kind: query
  command: "01F90000,4,AudioID0,AudioID1,AudioID2,AudioID3"
  params:
    - name: AudioID
      type: byte
      description: 32-bit Output/Input Audio ID- id: set_arbitration_set
  label: Set Arbitration - Set Owner Device ID
  kind: action
  command: "01F90000,5,AudioID0,AudioID1,AudioID2,AudioID3,DeviceID"
  params:
    - name: AudioID
      type: byte
      description: 32-bit Audio ID
    - name: DeviceID
      type: byte
      description: 0x00 = no owner, 0x40..0x60 = owning device ID

- id: set_monitor_channel_request
  label: Set Monitor Channel - Request Current Inputs
  kind: query
  command: "11000000,3,InputHi,InputLo,Number"
  params:
    - name: InputHi
      type: byte
      description: Set 0x00 on request
    - name: InputLo
      type: byte
      description: Set 0x00 on request
    - name: Number
      type: byte
      description: Monitor selector number (0..5 fw05, 0..199 fw06+)

- id: set_monitor_channel_set
  label: Set Monitor Channel - Set Inputs
  kind: action
  command: "11000000,6,InputHiL,InputLoL,Number,0,InputHiR,InputLoR"
  params:
    - name: InputHiL/InputLoL
      type: byte
      description: 16-bit audio address for left
    - name: Number
      type: byte
      description: Monitor selector number
    - name: InputHiR/InputLoR
      type: byte
      description: 16-bit audio address for right

- id: switch_fader_channel_on_off
  label: Switch Fader/Channel On/Off
  kind: action
  command: "11020000,3,FaderHi,FaderLo,On"
  params:
    - name: FaderHi
      type: byte
      description: 0x00..0x03 = Virtual Mixer 1..4 (LogicFader); 0x10 = Channel number mode
    - name: FaderLo
      type: byte
      description: LogicFader no. (0x00..0x2F) or Channel no. (1..150)
    - name: On
      type: byte
      description: 1 = on, 0 = off

- id: set_fader_notification_off
  label: Set Fader Level - Deactivate Notification
  kind: action
  command: "11030000,1,0x00"
  params: []

- id: set_fader_notification_on
  label: Set Fader Level - Activate Fader Value Notification
  kind: action
  command: "11030000,1,0x01"
  params: []

- id: set_fader_request
  label: Set Fader Level - Request
  kind: query
  command: "11030000,2,FaderHi,FaderLo"
  params:
    - name: FaderHi
      type: byte
      description: Virtual Mixer index    - name: FaderLo
      type: byte
      description: LogicFader or Channel number

- id: set_fader_set
  label: Set Fader Level - Set
  kind: action
  command: "11030000,4,FaderHi,FaderLo,LevelHi,LevelLo"
  params:
    - name: FaderHi
      type: byte
      description: Virtual Mixer index
    - name: FaderLo
      type: byte
      description: Fader
    - name: LevelHi/LevelLo
      type: byte
      description: 0x8000..0x7FFF = -327.68..327.67 dB

- id: set_fader_set_timed
  label: Set Fader Level - Set Within Time
  kind: action
  command: "11030000,7,FaderHi,FaderLo,LevelHi,LevelLo,TimeHi,TimeLo,Type"
  params:
    - name: FaderHi/FaderLo
      type: byte
      description: Fader identifier
    - name: LevelHi/LevelLo
      type: byte
      description: Target level dB
    - name: TimeHi/TimeLo
      type: byte
      description: 0x0000..0x2000 ms
    - name: Type
      type: byte
      description: 0 = level linear fade, 1 = fader linear fade

- id: set_fader_access_request
  label: Set Fader Access - Request Status
  kind: query
  command: "11040000,0"
  params: []

- id: set_fader_access_set
  label: Set Fader Access - Set Access
  kind: action
  command: "11040000,7,FaderHi,FaderLo,On,Type,ChannelHi,ChannelLo,AccGroup"
  params:
    - name: FaderHi
      type: byte
      description: Virtual Mixer index
    - name: FaderLo
      type: byte
      description: Fader
    - name: On
      type: byte
      description: 0/1    - name: Type
      type: byte
      description: 0 = GAIN, 1 = PAN/BAL, 2 = INPUTSELECT
    - name: ChannelHi/ChannelLo
      type: byte
      description: Channel number (used in answer)
    - name: AccGroup
      type: byte
      description: Acc-Group 1..6 (used in answer)

- id: set_channel_input_number_request_all
  label: Set Channel Input Number - Request All
  kind: query
  command: "110D0000,0"
  params: []

- id: set_channel_input_number_request_one
  label: Set Channel Input Number - Request Input for Fader
  kind: query
  command: "110D0000,2,FaderHi,FaderLo"
  params:
    - name: FaderHi
      type: byte
      description: Virtual Mixer
    - name: FaderLo
      type: byte
      description: Fader number

- id: set_channel_input_number_set
  label: Set Channel Input Number - Set (Input Select)
  kind: action
  command: "110D0000,4,FaderHi,FaderLo,ChannelHi,ChannelLo"
  params:
    - name: FaderHi/FaderLo
      type: byte
      description: Fader identifier
    - name: ChannelHi/ChannelLo
      type: byte
      description: Channel number 1..250

- id: set_internal_logic_request
  label: Set Internal Logic State - Request
  kind: query
  command: "110E0000,2,LogicIDHi,LogicIDLo"
  params:
    - name: LogicIDHi/LogicIDLo
      type: byte
      description: 16-bit Logic ID

- id: set_internal_logic_set
  label: Set Internal Logic State - Set
  kind: action
  command: "110E0000,3,LogicIDHi,LogicIDLo,On"
  params:
    - name: LogicIDHi/LogicIDLo
      type: byte
      description: 16-bit Logic ID
    - name: On
      type: byte
      description: 0 = off, 1 = on

- id: set_monitor_level_request
  label: Set Monitor Level - Request
  kind: query
  command: "11100000,2,PotHi,PotLo"
  params:
    - name: PotHi/PotLo
      type: byte
      description: Potentiometer 1..120 (0x0000..0x0077)

- id: set_monitor_level_set
  label: Set Monitor Level - Set Instant
  kind: action
  command: "11100000,4,PotHi,PotLo,LevelHi,LevelLo"
  params:
    - name: PotHi/PotLo
      type: byte
      description: Potentiometer 1..120
    - name: LevelHi/LevelLo
      type: byte
      description: 0x8000..0x7FFF = dB

- id: set_monitor_level_set_timed
  label: Set Monitor Level - Set Within Time
  kind: action
  command: "11100000,7,PotHi,PotLo,LevelHi,LevelLo,TimeHi,TimeLo,Type"
  params:
    - name: PotHi/PotLo
      type: byte
      description: Potentiometer 1..120
    - name: LevelHi/LevelLo
      type: byte
      description: Target dB
    - name: TimeHi/TimeLo
      type: byte
      description:0..0x2000 ms
    - name: Type
      type: byte
      description: 0 = level linear fade, 1 = fader linear fade

- id: set_display_label_restore
  label: Set Display/Channel Label - Restore Original
  kind: action
  command: "11140000,2,ChannelHi,ChannelLo"
  params:
    - name: ChannelHi/ChannelLo
      type: byte
      description: Channel 1..250 or 0x8001..0x800C central panel

- id: set_display_label_request
  label: Set Display/Channel Label - Request
  kind: query
  command: "11140000,3,ChannelHi,ChannelLo,DisplayNr"
  params:
    - name: ChannelHi/ChannelLo
      type: byte
      description: Channel or panel    - name: DisplayNr
      type: byte
      description: Display segment (each 4 chars)

- id: set_display_label_set
  label: Set Display/Channel Label - Set
  kind: action
  command: "11140000,8,ChannelHi,ChannelLo,DisplayNr,0,ASCII1,ASCII2,ASCII3,ASCII4"
  params:
    - name: ChannelHi/ChannelLo
      type: byte
      description: Channel or panel
    - name: DisplayNr
      type: byte
      description: 0..0x7F
    - name: ASCII1..ASCII4
      type: byte
      description: 0x00..0x7F characters

- id: set_pfl_switch_off_all
  label: Set PFL - Switch Off All
  kind: action
  command: "11160000,0"
  params: []

- id: set_pfl_switch_off_all_virtual_mixer
  label: Set PFL - Switch Off All on Virtual Mixer (fw06+)
  kind: action
  command: "11160000,1,FaderHi"
  params:
    - name: FaderHi
      type: byte
      description: Virtual Mixer 1..4

- id: set_pfl_request
  label: Set PFL - Request State
  kind: query
  command: "11160000,2,FaderHi,FaderLo"
  params:
    - name: FaderHi
      type: byte
      description: Virtual Mixer or 0x10 for channel
    - name: FaderLo
      type: byte
      description: LogicFader or Channel- id: set_pfl_set
  label: Set PFL - Set On/Off
  kind: action
  command: "11160000,4,FaderHi,FaderLo,On,AutoMute"
  params:
    - name: FaderHi
      type: byte
      description: Virtual Mixer or 0x10 channel
    - name: FaderLo
      type: byte
      description: LogicFader or Channel
    - name: On
      type: byte
      description: 1 = PFL on, 0 = off
    - name: AutoMute
      type: byte
      description: 1 = switch other PFLs off

- id: loadsave_load_channel_snapshot
  label: Load/Save - Load Channel Snapshot
  kind: action
  command: "111C0000,4,0x00,SnapshotNr,MixerID,FaderChannel"
  params:
    - name: SnapshotNr
      type: byte
      description: 0..250 channel snapshot
    - name: MixerID
      type: byte
      description: Virtual Mixer 1..4 or 0x10 channel
    - name: FaderChannel
      type: byte
      description: Fader 0..47 or Channel 0..250

- id: loadsave_save_channel_snapshot
  label: Load/Save - Save Channel Snapshot
  kind: action
  command: "111C0000,4,0x01,SnapshotNr,MixerID,FaderChannel"
  params:
    - name: SnapshotNr
      type: byte
      description: 0..250
    - name: MixerID
      type: byte
      description: Virtual Mixer 1..4 or 0x10 channel
    - name: FaderChannel
      type: byte
      description: Fader 0..47 or Channel 0..250

- id: loadsave_load_mixer_snapshot
  label: Load/Save - Load Mixer Snapshot
  kind: action
  command: "111C0000,3,0x0A,MixerID,FaderChannel"
  params:
    - name: MixerID
      type: byte
      description: Virtual Mixer 1..4 or 0x10 channel
    - name: FaderChannel
      type: byte
      description: Fader or Channel

- id: loadsave_save_mixer_snapshot
  label: Load/Save - Save Mixer Snapshot
  kind: action
  command: "111C0000,3,0x0B,MixerID,FaderChannel"
  params:
    - name: MixerID
      type: byte
      description: Virtual Mixer 1..4 or 0x10 channel
    - name: FaderChannel
      type: byte
      description: Fader or Channel

- id: set_io_gain_16bit_request
  label: Set IO Gain (16-bit) - Request
  kind: query
  command: "112D0000,2,IOHi,IOLo"
  params:
    - name: IOHi/IOLo
      type: byte
      description: Physical I/O address (output 0x0180..0x1EFF, input 0x0100..0x1E7F, summation0x4000..0x7FFF, 0xFFFF = Mute)

- id: set_io_gain_16bit_set
  label: Set IO Gain (16-bit) - Set
  kind: action
  command: "112D0000,4,IOHi,IOLo,ValueHi,ValueLo"
  params:
    - name: IOHi/IOLo
      type: byte
      description: Physical I/O address
    - name: ValueHi/ValueLo
      type: byte
      description: Gain 0x8000..0x7FFF (-327.68..327.67 dB)

- id: set_io_gain_32bit_request
  label: Set IO Gain (32-bit) - Request
  kind: query
  command: "112D0000,4,AudioID0,AudioID1,AudioID2,AudioID3"
  params:
    - name: AudioID
      type: byte
      description: 32-bit Audio ID

- id: set_io_gain_32bit_set
  label: Set IO Gain (32-bit) - Set
  kind: action
  command: "112D0000,6,AudioID0,AudioID1,AudioID2,AudioID3,ValueHi,ValueLo"
  params:
    - name: AudioID
      type: byte
      description: 32-bit Audio ID
    - name: ValueHi/ValueLo
      type: byte
      description: Gain in dB

- id: metering_set_notification
  label: Metering - Activate/Deactivate Notification
  kind: action
  command: "111D0000,2,Leveldetect,ON"
  params:
    - name: Leveldetect
      type: byte
      description: 1..30 position in TB8 configuration
    - name: ON
      type: byte
      description: 0 deactivate, 1 activate

- id: get_set_param_cf_input_request
  label: Get/Set Parameter - CleanFeed Input Request
  kind: query
  command: "11810000,4,ChannelHi,ChannelLo,0x00,0x24"
  params:
    - name: ChannelHi/ChannelLo
      type: byte
      description: Channel 1..250
    - name: CFIn Prefix
      type: byte
      description: Mandatory 0x0024

- id: get_set_param_cf_input_set
  label: Get/Set Parameter - CleanFeed Input Set
  kind: action
  command: "11810000,8,ChannelHi,ChannelLo,0x00,0x24,P0,P1,P2,P3"
  params:
    - name: ChannelHi/ChannelLo
      type: byte
      description: Channel 1..250
    - name: P0..P3
      type: byte
      description: 32-bit CFIn parameter; bits 7..0 = gain 0xD8..0x0F (-40..+15 dB)

- id: get_set_param_cf_output_request
  label: Get/Set Parameter - CleanFeed Output Request
  kind: query
  command: "11810000,4,ChannelHi,ChannelLo,0x00,0x25"
  params:
    - name: ChannelHi/ChannelLo
      type: byte
      description: Channel 1..250
    - name: CFOut Prefix
      type: byte
      description: Mandatory 0x0025

- id: get_set_param_cf_output_set
  label: Get/Set Parameter - CleanFeed Output Set
  kind: action
  command: "11810000,8,ChannelHi,ChannelLo,0x00,0x25,P0,P1,P2,P3"
  params:
    - name: ChannelHi/ChannelLo
      type: byte
      description: Channel 1..250
    - name: P0..P3
      type: byte
      description: 32-bit CFOut parameter; bits 18 N-Mix, 17 AltSrc, 16 Mute, 15..8 AltSrc pos, 7..0 gain 0xD2..0x0A (-30..+10 dB)
```

## Feedbacks
```yaml
# ECP responses are returned as separate 16-byte blocks with the same command ID.
# The following are recognized unsolicited/response payloads.

- id: crosspoint_notification_16bit
  label: Crosspoint Notification (16-bit)
  type: object
  description: |
    Block of length 4 in response to routing change or to a 32-bit notification activation.
    D0..D1 = Output, D2..D3 = Input (per16-bit AudioID scheme).

- id: fader_value_notification
  label: Fader Value Notification
  type: object
  description: |
    Length 4 datagram sent when fader notification activated. FaderHi 0x00..0x03.
    D0 = FaderHi, D1 = FaderLo, D2..D3 = signed fader level.

- id: arbitration_status
  label: Arbitration Status
  type: object
  description: |
    Length 5: D0..D3 = AudioID, D4 = owning DeviceID (0x00 = no owner, 0x40..0x60 = owning device).

- id: metering_value_notification
  label: Metering Value Notification
  type: object
  description: |
    Length 6. D0 = Leveldetect index, D1 = Correlation -100..0..100 (-1.00..1.00),
    D2..D3 = LevelL dB, D4..D5 = LevelR dB (signed short).

- id: motorfader_touched
  label: Motorfader Touched (unsolicited)
  type: object
  description: |
    Length 2. D0 = ChannelNr 0x01..0xFA, D1 = 1 touched / 0 released.
    Emitted by device when motorized faders touched.

- id: ack_nak
  label: Serial ACK/NAK
  type: enum
  values: [ack, nak]
  description: ACK=0x06, NAK=0x05 per serial block protocol. Must be received within 80 ms.

- id: param_value_information_cf_input
  label: CF Input Parameter Value Information
  type: object
  description: Length 8 with CFIn prefix 0x0024 and32-bit parameter value.

- id: param_value_information_cf_output
  label: CF Output Parameter Value Information
  type: object
  description: Length 8 with CFOut prefix 0x0025 and 32-bit parameter value.
```

## Variables
```yaml
# Continuously settable parameter commands already enumerated as actions.
# No additional standalone settable variables beyond those.
```

## Events
```yaml
# Cross-reference to unsolicited/notification feedbacks above.
- id: crosspoint_change
  description: Triggered on internal routing change when 32-bit notification activated (TCP only).
- id: fader_value_change
  description: Triggered when fader value changes and notification activated.
- id: meter_level_change
  description: Triggered when metering level changes and notification activated.
- id: motorfader_touch
  description: Triggered when user touches motorized fader (if installed).
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes arbitration ownership not enforced by firmware ("routings are always possible even if an Device ID is set"); IO Gain changes "valid until restart" - these are advisory, not safety interlock procedures.
```

## Notes
- ECP deprecated from firmware 10.2; Control API recommended for XC3/XD3/XS3 generations.
- 32-bit routing (0x01F5xxxx len 8) recommended on 52/XS/XC/XD/XS2/XC2/XD2 hardware; 16-bit form acceptable for older RM4200D/XR.
- 32-bit AudioID format differs between RM4200D/XR (Version 1) and 52/XS/XC/XD (Version 2). AudioIDs must be exported from project TB5/TB8 configuration.
- Serial block: STX=0x02, EOT=0x08, DLE=0x0A, ACK=0x06, NAK=0x05. Bytes 0x00..0x1F escaped as DLE,(byte+0x20). Checksum = iterative (Byte XOR 0xAA), shifted left 1 each step, 8-bit.
- IP block always 16 bytes; data MSB-first (Motorola format). Reserved U0/U1/U2 bytes zero on transmit.
- Up to 10 TCP sockets per device (max 4 on RM420-850 fw05.05.27..05.06.01; max 5 until fw 7.04.06).
- Notification/activation commands are TCP-only (crosspoint notification).

<!-- UNRESOLVED: firmware version of the RM420-027 instance; electrical specs of RS-232/RS-422 interfaces (per source, see module documentation). -->

## Provenance

```yaml
source_domains:
  - developer.dhd.audio
source_urls:
  - https://developer.dhd.audio/docs/API/ECP/
  - https://developer.dhd.audio/docs/API/ECP/commands
  - https://developer.dhd.audio/docs/API/ECP/communication
  - https://developer.dhd.audio/
retrieved_at: 2026-08-18T00:04:37.967Z
last_checked_at: 2026-08-19T09:18:57.686Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:18:57.686Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions map to verbatim source commands with matching ID, length, and parameter shape; transport is verbatim. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source states ECP availability per firmware version but does not state firmware version of this RM420-027 device itself."
- "source notes arbitration ownership not enforced by firmware (\"routings are always possible even if an Device ID is set\"); IO Gain changes \"valid until restart\" - these are advisory, not safety interlock procedures."
- "firmware version of the RM420-027 instance; electrical specs of RS-232/RS-422 interfaces (per source, see module documentation)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
