---
spec_id: admin/linn-net-aux
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linn Net Aux LPEC Control Spec"
manufacturer: Linn
model_family: "Linn Net Aux"
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - "Linn Net Aux"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.linn.co.uk
source_urls:
  - https://docs.linn.co.uk/wiki/images/3/32/LPEC_V2-5.pdf
  - https://docs.linn.co.uk/wiki/index.php/Developer:LPEC
  - https://docs.linn.co.uk/wiki/index.php/Linn_DS/DSM_control
  - https://docs.linn.co.uk/wiki/index.php/Third_party_control_solutions
  - https://docs.linn.co.uk/wiki/index.php/Developer:Documentation
retrieved_at: 2026-05-22T07:29:24.847Z
last_checked_at: 2026-06-09T12:17:56.545Z
generated_at: 2026-06-09T12:17:56.545Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Net Aux is a source type within DS/DSM; no standalone Net Aux product spec exists"
  - "LPEC provides configuration get/set (Ds/Config) but source"
  - "source describes multi-step sequences (e.g. Radio station"
  - "full command set for Net Aux source — source documents DS/DSM general commands, not Net Aux specific commands beyond source selection"
verification:
  verdict: verified
  checked_at: 2026-06-09T12:17:56.545Z
  matched_actions: 76
  action_count: 76
  confidence: medium
  summary: "All 76 spec actions matched in source. Bidirectional coverage complete (76/76 = 1.0). Transport verified: TCP port 23, no auth. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Linn Net Aux LPEC Control Spec

## Summary
Linn Network Aux (Net Aux) is a source type within Linn DS/DSI/DSM network streamers. Control via LPEC protocol over TCP/Telnet on port 23. No authentication required. Net Aux selected by `SetSourceBySystemName "Net Aux"` via Ds/Product service.

<!-- UNRESOLVED: Net Aux is a source type within DS/DSM; no standalone Net Aux product spec exists -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- levelable
- routable
- queryable
```

## Actions
```yaml
- id: subscribe_product
  label: Subscribe Ds/Product
  kind: subscription
  params: []
- id: standby
  label: Set Standby
  kind: action
  params:
    - name: state
      type: string
      description: '"0" = out of standby, "1" = into standby'
- id: set_source_by_system_name
  label: SetSourceBySystemName
  kind: action
  params:
    - name: source
      type: string
      description: Source system name (e.g. "Net Aux", "Playlist", "Radio")
- id: set_source_index_by_name
  label: SetSourceIndexByName
  kind: action
  params:
    - name: name
      type: string
      description: Source display name configured in Konfig
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0-100
- id: volume_inc
  label: Volume Increment
  kind: action
  params: []
- id: volume_dec
  label: Volume Decrement
  kind: action
  params: []
- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: string
      description: '"1" = mute on, "0" = mute off'
- id: subscribe_volume
  label: Subscribe Ds/Volume
  kind: subscription
  params: []
- id: subscribe_info
  label: Subscribe Ds/Info
  kind: subscription
  params: []
- id: query_product
  label: Product Info
  kind: query
  params: []
- id: set_source_index
  label: SetSourceIndex
  kind: action
  params:
    - name: index
      type: string
      description: Source index number (e.g. "0" for Playlist)
- id: query_source_index
  label: Query Source Index
  kind: query
  params: []
- id: query_source
  label: Source Details
  kind: query
  params:
    - name: index
      type: string
      description: Source index to query (e.g. "0", "1", "2")
- id: query_standby
  label: Query Standby State
  kind: query
  params: []
- id: subscribe_radio
  label: Subscribe Ds/Radio
  kind: subscription
  params: []
- id: radio_play
  label: Radio Play
  kind: action
  params: []
- id: radio_stop
  label: Radio Stop
  kind: action
  params: []
- id: radio_read_list
  label: Radio ReadList
  kind: query
  params:
    - name: id
      type: string
      description: Preset station number to read (e.g. "1")
- id: radio_set_channel
  label: Radio SetChannel
  kind: action
  params:
    - name: uri
      type: string
      description: Station URI
    - name: metadata
      type: string
      description: Station metadata (empty string if none)
- id: radio_set_id
  label: Radio SetId
  kind: action
  params:
    - name: id
      type: string
      description: Station ID number from Radio favourites list
    - name: metadata
      type: string
      description: Metadata string (empty string if none)
- id: subscribe_playlist
  label: Subscribe Ds/Playlist
  kind: subscription
  params: []
- id: playlist_play
  label: Playlist Play
  kind: action
  params: []
- id: playlist_pause
  label: Playlist Pause
  kind: action
  params: []
- id: playlist_stop
  label: Playlist Stop
  kind: action
  params: []
- id: playlist_next
  label: Playlist Next
  kind: action
  params: []
- id: playlist_previous
  label: Playlist Previous
  kind: action
  params: []
- id: playlist_set_shuffle
  label: Playlist SetShuffle
  kind: action
  params:
    - name: state
      type: string
      description: '"1" = shuffle on, "0" = shuffle off'
- id: playlist_set_repeat
  label: Playlist SetRepeat
  kind: action
  params:
    - name: state
      type: string
      description: '"1" = repeat on, "0" = repeat off'
- id: playlist_id
  label: Playlist Id
  kind: query
  params: []
- id: playlist_read_list
  label: Playlist ReadList
  kind: query
  params:
    - name: id
      type: string
      description: Track ID to read metadata for
- id: playlist_transport_state
  label: Playlist TransportState
  kind: query
  params: []
- id: playlist_insert
  label: Playlist Insert
  kind: action
  params:
    - name: id
      type: string
      description: Track ID after which to insert
    - name: url
      type: string
      description: Track URL
    - name: metadata
      type: string
      description: Track metadata
- id: subscribe_time
  label: Subscribe Ds/Time
  kind: subscription
  params: []
- id: unsubscribe_time
  label: Unsubscribe Ds/Time
  kind: action
  params: []
- id: subscribe_transport
  label: Subscribe Ds/Transport
  kind: subscription
  params: []
- id: transport_play
  label: Transport Play
  kind: action
  params: []
- id: transport_pause
  label: Transport Pause
  kind: action
  params: []
- id: transport_stop
  label: Transport Stop
  kind: action
  params: []
- id: transport_skip_next
  label: Transport SkipNext
  kind: action
  params: []
- id: transport_skip_previous
  label: Transport SkipPrevious
  kind: action
  params: []
- id: transport_state
  label: Transport TransportState
  kind: query
  params: []
- id: transport_modes
  label: Transport Modes
  kind: query
  params: []
- id: transport_mode_info
  label: Transport ModeInfo
  kind: query
  params: []
- id: transport_set_repeat
  label: Transport SetRepeat
  kind: action
  params:
    - name: state
      type: string
      description: '"1" = repeat on, "0" = repeat off'
- id: transport_repeat
  label: Transport Repeat
  kind: query
  params: []
- id: transport_set_shuffle
  label: Transport SetShuffle
  kind: action
  params:
    - name: state
      type: string
      description: '"1" = shuffle on, "0" = shuffle off'
- id: transport_shuffle
  label: Transport Shuffle
  kind: query
  params: []
- id: subscribe_pins
  label: Subscribe Ds/Pins
  kind: subscription
  params: []
- id: pins_invoke_id
  label: Pins InvokeId
  kind: action
  params:
    - name: id
      type: string
      description: PIN idArray location number (e.g. "1")
- id: pins_read_list
  label: Pins ReadList
  kind: query
  params:
    - name: id
      type: string
      description: PIN idArray location (e.g. "[ 1]")
- id: pins_get_id_array
  label: Pins GetIdArray
  kind: query
  params: []
- id: subscribe_receiver
  label: Subscribe Ds/Receiver
  kind: subscription
  params: []
- id: sender_metadata
  label: Sender Metadata
  kind: query
  params: []
- id: receiver_transport_state
  label: Receiver TransportState
  kind: query
  params: []
- id: receiver_sender
  label: Receiver Sender
  kind: query
  params: []
- id: receiver_play
  label: Receiver Play
  kind: action
  params: []
- id: receiver_stop
  label: Receiver Stop
  kind: action
  params: []
- id: receiver_set_sender
  label: Receiver SetSender
  kind: action
  params:
    - name: uri
      type: string
      description: OHZ address of Songcast sender (e.g. "ohz://239.255.255.250:51972/...")
    - name: metadata
      type: string
      description: DIDL-Lite metadata string (empty string if none)
- id: volkano_mac_address
  label: Volkano MacAddress
  kind: query
  params: []
- id: volkano_reboot
  label: Volkano Reboot
  kind: action
  params: []
- id: config_get_keys
  label: Config GetKeys
  kind: query
  params: []
- id: config_set_value
  label: Config SetValue
  kind: action
  params:
    - name: key
      type: string
      description: Configuration key name (e.g. "Analogue.Exakt.Dual.Fronts")
    - name: value
      type: string
      description: Configuration value to set (e.g. "1")
- id: config_get_value
  label: Config GetValue
  kind: query
  params:
    - name: key
      type: string
      description: Configuration key name (e.g. "Analogue.Exakt.Dual.Fronts")
- id: subscribe_preamp_product
  label: Subscribe Preamp/Product
  kind: subscription
  params: []
- id: preamp_set_source_index
  label: Preamp SetSourceIndex
  kind: action
  params:
    - name: index
      type: string
      description: Source index number on the proxy preamplifier
- id: preamp_source_index
  label: Preamp SourceIndex
  kind: query
  params: []
- id: preamp_source
  label: Preamp Source
  kind: query
  params:
    - name: index
      type: string
      description: Source index to query (e.g. "0", "1", "2")
- id: preamp_set_source_by_system_name
  label: Preamp SetSourceBySystemName
  kind: action
  params:
    - name: system_name
      type: string
      description: Source SystemName on proxy preamp (e.g. "Analog 2")
- id: preamp_set_source_index_by_name
  label: Preamp SetSourceIndexByName
  kind: action
  params:
    - name: name
      type: string
      description: Source display name configured by user in Konfig (e.g. "XBox")
- id: preamp_set_standby
  label: Preamp SetStandby
  kind: action
  params:
    - name: state
      type: string
      description: '"0" = bring proxy preamp out of standby, "1" = put into standby'
- id: subscribe_preamp_volume
  label: Subscribe Preamp/Volume
  kind: subscription
  params: []
- id: preamp_set_volume
  label: Preamp SetVolume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0-100
- id: preamp_volume_inc
  label: Preamp VolumeInc
  kind: action
  params: []
- id: preamp_volume_dec
  label: Preamp VolumeDec
  kind: action
  params: []
- id: preamp_set_mute
  label: Preamp SetMute
  kind: action
  params:
    - name: state
      type: string
      description: '"1" = mute on, "0" = mute off'
```

## Feedbacks
```yaml
- id: standby_state
  label: Standby State
  type: enum
  values: ['"false"', '"true"']
- id: volume_level
  label: Volume Level
  type: integer
- id: mute_state
  label: Mute State
  type: enum
  values: ['"1"', '"0"']
- id: source_index
  label: Source Index
  type: string
- id: product_event
  label: Product Event
  type: string
- id: volume_event
  label: Volume Event
  type: string
```

## Variables
```yaml
# UNRESOLVED: LPEC provides configuration get/set (Ds/Config) but source
# does not enumerate specific Net Aux configurable parameters
```

## Events
```yaml
- id: product_event
  label: Ds/Product Event
  description: Auto-event on product state change (standby, source)
- id: volume_event
  label: Ds/Volume Event
  description: Auto-event on volume or mute change
- id: transport_event
  label: Ds/Transport Event
  description: Auto-event on play/pause/stop/skip state
```

## Macros
```yaml
# UNRESOLVED: source describes multi-step sequences (e.g. Radio station
# selection via SetChannel with Uri/Metadata) but no named macro definitions
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
LPEC command format: `Action Ds/Service <instance> <Command> ["param"]`. Commands are CASE-SENSITIVE. Subscription returns EVENT with subscription ID linking response to subscription. Unsubscribe to stop events. All services unsubscribed when TELNET port closes. Net Aux is source index 3 on DS/DSM (dynamic — use `SetSourceBySystemName "Net Aux"` to select reliably).
<!-- UNRESOLVED: full command set for Net Aux source — source documents DS/DSM general commands, not Net Aux specific commands beyond source selection -->

## Provenance

```yaml
source_domains:
  - docs.linn.co.uk
source_urls:
  - https://docs.linn.co.uk/wiki/images/3/32/LPEC_V2-5.pdf
  - https://docs.linn.co.uk/wiki/index.php/Developer:LPEC
  - https://docs.linn.co.uk/wiki/index.php/Linn_DS/DSM_control
  - https://docs.linn.co.uk/wiki/index.php/Third_party_control_solutions
  - https://docs.linn.co.uk/wiki/index.php/Developer:Documentation
retrieved_at: 2026-05-22T07:29:24.847Z
last_checked_at: 2026-06-09T12:17:56.545Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T12:17:56.545Z
matched_actions: 76
action_count: 76
confidence: medium
summary: "All 76 spec actions matched in source. Bidirectional coverage complete (76/76 = 1.0). Transport verified: TCP port 23, no auth. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Net Aux is a source type within DS/DSM; no standalone Net Aux product spec exists"
- "LPEC provides configuration get/set (Ds/Config) but source"
- "source describes multi-step sequences (e.g. Radio station"
- "full command set for Net Aux source — source documents DS/DSM general commands, not Net Aux specific commands beyond source selection"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
